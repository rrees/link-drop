
def html(response):
	response.content_type = "text/html"
	return response

def text(response):
	response.content_type = "text/plain"
	return response