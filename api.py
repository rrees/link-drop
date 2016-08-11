import falcon

import handlers

app = falcon.API()

routes = [
	('/api/collections', handlers.collections.Collections()),
	('/api/collections/new', handlers.collections.NewCollection()),
	('/api/collections/recent', handlers.collections.RecentCollections()),
]

for path, handler in routes:
	app.add_route(path, handler)
