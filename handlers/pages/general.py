import json

import falcon

import renderer
import headers

class Front:
	def on_get(self, req, resp):
		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("index.html", {})

class Home:
	def on_get(self, req, resp):
		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("home.html", {})