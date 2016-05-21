import models

def all_collections(user):
	return models.Collection.query().filter(models.Collection.user_id == user.user_id())