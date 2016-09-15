import os

import jinja2

import filters

JINJA = jinja2.Environment(
	loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__), 'templates')),
	extensions=['jinja2.ext.autoescape'],
	autoescape=True)

JINJA.filters = filters.all_filters

def render(template_path, template_data):
	template = JINJA.get_template(template_path)
	return template.render(template_data)
