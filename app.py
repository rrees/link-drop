import falcon

import handlers

app = falcon.API()

routes = [
	('/', handlers.pages.general.Front()),
	('/home', handlers.pages.general.Home()),
	('/api/collections', handlers.collections.Collections()),
	('/api/collections/new', handlers.collections.NewCollection()),
	('/api/collections/recent', handlers.collections.RecentCollections()),
	('/collection/{collection_id}', handlers.links.Collection()),
	('/collection/{collection_id}/links', handlers.links.Links()),
	('/collection/{collection_id}/view', handlers.pages.collections.View()),
	('/collection/{collection_id}/public', handlers.collections.Public()),
	('/collection/{collection_id}/link/{link_index}', handlers.pages.links.View()),
	('/collection/{collection_id}/link/{link_index}/form/delete', handlers.pages.links.DeleteForm()),
	('/collection/{collection_id}/link/{link_index}/form/edit', handlers.pages.links.EditForm()),
	('/links/{public_id}', handlers.pages.collections.PublicView()),
	('/collections', handlers.pages.collections.All()),
]

for path, handler in routes:
	app.add_route(path, handler)
