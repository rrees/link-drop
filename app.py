import falcon

import pages
import handlers
import links

app = falcon.API()

routes = [
	('/', pages.Front()),
	('/home', pages.Home()),
	('/collections', handlers.collections.Collections()),
	('/collections/new', links.NewCollection()),
	('/collection/{collection_id}', links.Collection()),
	('/collection/{collection_id}/links', links.Links()),
]

for path, handler in routes:
	app.add_route(path, handler)
