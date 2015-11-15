import falcon
import json

import renderer

class Hello:
	def on_get(self, req, resp):
		resp.status = falcon.HTTP_200
		resp.content_type = "text/html"
		resp.body = renderer.render("index.html", {})

app = falcon.API()

app.add_route('/', Hello())
