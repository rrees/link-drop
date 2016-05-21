from google.appengine.ext import ndb

class Collection(ndb.Model):
	user = ndb.UserProperty(required=True)
	name = ndb.StringProperty(required=True)
	description = ndb.StringProperty()