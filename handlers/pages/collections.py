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
	def on_get(self, req, resp, collection_id):
		resp.status = falcon.HTTP_200

		headers.html(resp)

		current_user = users.get_current_user()

		template_data = {
			'collection': repositories.collections.read(current_user, collection_id)
		}
		
		resp.body = renderer.render("collections/view.html", template_data)
