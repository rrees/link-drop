import json
import logging

import falcon

from google.appengine.api import users

import queries
import repositories

class Collections:

	def on_get(self, request, response):
		response.status = falcon.HTTP_200

		user = users.get_current_user()

		payload = {
			"collections" : [repositories.collections.to_map(c) for c in queries.all_collections(user)]
		}

		response.body = json.dumps(payload)

class NewCollection(object):
	def on_put(self, request, response):
		response.status = falcon.HTTP_200

		logging.info("Create new collection")

		data = json.load(request.stream)
		logging.info(data)
		collection_name = data.get('name')

		user = users.get_current_user()

		new_collection = repositories.collections.create(user, collection_name)
		logging.info(new_collection)

		payload = {'name': new_collection.name}
		response.body = json.dumps(payload)

class RecentCollections(object):
	def on_get(self, request, response):
		response.status = falcon.HTTP_200

		user = users.get_current_user()

		payload = {
			"collections": [repositories.collections.to_map(c) for c in repositories.collections.latest_modified(user)]
		}
		response.body = json.dumps(payload)