import json
import logging

import falcon

from google.appengine.api import users

import repositories

class Collections:

	def on_get(self, request, response):
		response.status = falcon.HTTP_200

		user = users.get_current_user()

		collections = [repositories.collections.to_map(c) for c in repositories.collections.all_collections(user, sort=True)]

		payload = {
			"collections" : collections,
		}

		response.body = json.dumps(payload)

class NewCollection(object):
	def on_put(self, request, response):
		response.status = falcon.HTTP_200

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


class Public:
	def on_put(self, request, response, collection_id):
		current_user = users.get_current_user()

		collection = repositories.collections.toggle_public(current_user, collection_id)

		logging.info(collection.public)

		response.status =falcon.HTTP_200
		response.body = json.dumps(repositories.collections.to_map(collection))

