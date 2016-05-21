from google.appengine.ext import ndb

class Collection(ndb.Model):
	user_id = ndb.StringProperty(required=True)
	name = ndb.StringProperty(required=True)
	description = ndb.StringProperty()