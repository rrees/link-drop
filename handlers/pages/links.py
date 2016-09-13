import logging

import falcon

from google.appengine.api import users

import renderer
import headers

import repositories
import forms

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
		current_user = users.get_current_user()
		link_idx = int(link_index)
		repositories.links.remove_link(current_user, collection_id, link_idx)
		raise falcon.HTTPFound('/collection/{0}/view'.format(collection_id))

class EditForm:
	def on_post(self, request, response, collection_id, link_index):
		link_idx = int(link_index)

		current_user = users.get_current_user()

		form_data = forms.edit_link(request.params)

		logging.info(form_data)

		repositories.links.update(current_user, collection_id, link_idx, form_data)

		raise falcon.HTTPFound('/collection/{0}/link/{1}'.format(collection_id, link_index))