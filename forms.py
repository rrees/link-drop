import logging

def edit_link(params):
	return {
		'name': params.get('name', None),
		'description': params.get('description', None)
	}