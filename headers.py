
def html(response):
	response.content_type = "text/html"
	return response
