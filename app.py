import falcon

import pages
import api

app = falcon.API()

routes = [
	('/', pages.Front()),
	('/home', pages.Home()),
	('/api/collection/{collection_id}', api.Collection())
]

for path, handler in routes:
	app.add_route(path, handler)
