import json
import logging

import falcon

import renderer
import headers

class Page:
	def on_get(self, req, resp):

		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("settings.html", {})
