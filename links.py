import json

import falcon

class Collections:
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

class Links(object):
	def on_get(self, request, response, collection_id):
		response.status = falcon.HTTP_200
		response.body = json.dumps({'collection_id': collection_id})

	def on_post(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		resp.body = json.dumps({'collection_id': collection_id})
