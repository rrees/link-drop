
def name_or_url(link):
	if hasattr(link, 'name'):
		return link.name

	return link.url

all_filters = {
	'name_or_url': name_or_url,
}