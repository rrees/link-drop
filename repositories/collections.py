import uuid

import models

def create(user, name, description=None):
	public_id = uuid.uuid4().hex

	new_collection = models.Collection(name=name, user_id=user.user_id(), public_id=public_id)

	if description:
		new_collection.description = description

	new_collection.put()

	return new_collection