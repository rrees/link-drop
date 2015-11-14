import falcon
import json

class Hello:
	def on_get(self, req, resp):
		resp.status = falcon.HTTP_200
		resp.body = json.dumps({"message": 'Hello from Falcon'})

app = falcon.API()

app.add_route('/', Hello())
