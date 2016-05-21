import json

import falcon

from google.appengine.api import users

import queries

class Collections:

	def on_get(self, request, response):
		response.status = falcon.HTTP_200

		user = users.get_current_user()

		payload = {
			"collections" : [c for c in queries.all_collections(user)]
		}

		response.body = json.dumps(payload)
	
	def on_put(self, request, response):
		response.status = falcon.HTTP_200

		data = json.load(request.stream)
		collection_name = data.get('name')
		payload = {'name': collection_name}
		response.body = json.dumps(payload)

class Collection(object):
	def on_get(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		resp.body = json.dumps({'collection_id': collection_id})

class NewCollection(object):
	def on_put(self, req, resp):
		resp.status = falcon.HTTP_200

		resp.body = json.dumps({'collectionId' : 'Hello world'})

class Links(object):
	def on_get(self, request, response, collection_id):
		response.status = falcon.HTTP_200
		response.body = json.dumps({'collection_id': collection_id})

	def on_post(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		resp.body = json.dumps({'collection_id': collection_id})
