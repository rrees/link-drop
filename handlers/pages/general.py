import json
import logging

from google.appengine.api import users

import falcon

import renderer
import headers

class Front:
	def on_get(self, req, resp):
		current_user = users.get_current_user

		if current_user:
			raise falcon.redirects.HTTPFound('/home')

		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("index.html", {})

class Home:
	def on_get(self, req, resp):
		current_user = users.get_current_user

		if not current_user:
			raise falcon.redirects.HTTPFound('/')


		resp.status = falcon.HTTP_200

		headers.html(resp)
		
		resp.body = renderer.render("home.html", {})