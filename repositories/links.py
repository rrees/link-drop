import logging

import collections

def remove_link(user, collection_id, link_index):
	collection = collections.read(user, collection_id)

	del(collection.links[link_index])

	collection.put()
	return collection
	