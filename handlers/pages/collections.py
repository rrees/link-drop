import json

import falcon

from google.appengine.api import users

import renderer
import headers

import repositories

class View:
	def on_get(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		headers.html(resp)

		current_user = users.get_current_user()

		template_data = {
			'collection': repositories.collections.read(current_user, collection_id)
		}
		
		resp.body = renderer.render("collections/view.html", template_data)

class PublicView:
	def on_get(self, req, response, public_id):

		collection = repositories.collections.read_public_collection(public_id)

		if collection == None or not collection.public:
			headers.text(response)
			response.status = falcon.HTTP_404
			response.body = "Unknown collection"
			return


		template_data = {
			'collection': collection,
		}

		headers.html(response)
		response.status = falcon.HTTP_200
		response.body = renderer.render("collections/public/view.html", template_data)


class All:
	def on_get(self, request, response):
		user = users.get_current_user()

		collections = [repositories.collections.to_map(c) for c in repositories.collections.all_collections(user, sort=True)]

		template_data = {
			"collections" : collections,
		}

		headers.html(response)
		response.status = falcon.HTTP_200
		response.body = renderer.render("collections/list.html", template_data)