import falcon

import pages
import handlers
import links

app = falcon.API()

routes = [
	('/', pages.Front()),
	('/home', pages.Home()),
	('/collections', handlers.collections.Collections()),
	('/collections/new', handlers.collections.NewCollection()),
	('/collections/recent', handlers.collections.RecentCollections()),
	('/collection/{collection_id}', links.Collection()),
	('/collection/{collection_id}/links', links.Links()),
	('/collection/{collection_id}/view', handlers.pages.collections.View()),
	('/collection/{collection_id}/public', handlers.pages.collections.PublicView()),
]

for path, handler in routes:
	app.add_route(path, handler)
