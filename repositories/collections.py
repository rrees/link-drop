import uuid
import logging
import json
import datetime

from google.appengine.ext import ndb

import models

def create(user, name, description=None):
	public_id = uuid.uuid4().hex

	new_collection = models.Collection(name=name, user_id=user.user_id(), public_id=public_id)

	if description:
		new_collection.description = description

	new_collection.put()

	logging.info(new_collection)

	return new_collection

def to_map(collection):
	payload = {
		"id": collection.key.urlsafe(),
		"name": collection.name,
	}

	return payload

def all_collections(user):
	return models.Collection.query().filter(models.Collection.user_id == user.user_id())

def latest_modified(user, limit=10):
	now = datetime.datetime.now()
	last_updated_time = now - datetime.timedelta(days=30)
	return models.Collection.query().filter(models.Collection.user_id == user.user_id()).filter(models.Collection.updated >= last_updated_time)

def read(user, collection_id):
	key = ndb.Key(urlsafe=collection_id)

	return key.get()

def add_link(user, collection_id, url):
	collection = read(user, collection_id)
	link = models.Link(url=url)
	collection.links.append(link)
	collection.put()
	return collection

def read_public_collection(public_id):
	query = models.Collection.query().filter(models.Collection.public_id == public_id)

	collection = query.get()

	return collection