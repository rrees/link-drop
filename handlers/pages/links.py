import falcon

from google.appengine.api import users

import renderer
import headers

import repositories

class View:
	def on_get(self, request, response, collection_id, link_index):

		link_idx = int(link_index)

		response.status = falcon.HTTP_200

		headers.html(response)

		current_user = users.get_current_user()

		collection = repositories.collections.read(current_user, collection_id)
		link = collection.links[link_idx]

		template_data = {
			'collection': collection,
			'link': link,
			'link_index': link_idx,
		}
		
		response.body = renderer.render("collections/links/view.html", template_data)

class DeleteForm:
	def on_post(self, request, response, collection_id, link_index):
		pass