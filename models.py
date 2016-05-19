from google.appengine.ext import ndb

class Collection(ndb.Model):
	name = ndb.StringProperty(required=True)
	description = ndb.StringProperty()