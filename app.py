import falcon

import pages
import links

app = falcon.API()

routes = [
	('/', pages.Front()),
	('/home', pages.Home()),
	('/collection/{collection_id}', links.Collection()),
	('/collection/{collection_id}/links', links.Links()),
]

for path, handler in routes:
	app.add_route(path, handler)
