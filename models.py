from google.appengine.ext import ndb

class Link(ndb.Model):
	url = ndb.StringProperty(required=True)
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)

class Collection(ndb.Model):
	user_id = ndb.StringProperty(required=True)
	name = ndb.StringProperty(required=True)
	description = ndb.StringProperty()
	links = ndb.StructuredProperty(Link, repeated=True)
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)