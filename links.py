import json
import logging

import falcon

from google.appengine.api import users

import queries
import repositories

class Collection(object):
	def on_get(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		resp.body = json.dumps({'collection_id': collection_id})

	def on_delete(self, request, response, collection_id):

		current_user = users.get_current_user()

		repositories.collections.delete(current_user, collection_id)

		response.status = falcon.HTTP_200
		response.body = json.dumps({'collection_id': collection_id})


class Links(object):
	def on_get(self, request, response, collection_id):
		response.status = falcon.HTTP_200
		response.body = json.dumps({'collection_id': collection_id})

	def on_put(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		data = json.load(req.stream)
		logging.info(data)

		user =  users.get_current_user()
		link = data.get("link")
		repositories.collections.add_link(user, collection_id, link)

		resp.body = json.dumps({'collection_id': collection_id})
