import logging

import collections

def remove_link(user, collection_id, link_index):
	collection = collections.read(user, collection_id)

	del(collection.links[link_index])

	collection.put()
	return collection

def update(user, collection_id, link_index, form_data):

	collection = collections.read(user, collection_id)
	link = collection.links[link_index]

	if 'name' in form_data and form_data['name']:
		logging.info(form_data)
		link.name = form_data['name']

	collection.put()

	return collection
