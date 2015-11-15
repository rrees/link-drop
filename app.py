import falcon
import json

import renderer
import headers

class Hello:
	def on_get(self, req, resp):
		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("index.html", {})

app = falcon.API()

app.add_route('/', Hello())
