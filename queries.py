import models

def all_collections(user):
	return models.Collection.query(models.Collection.user == user)