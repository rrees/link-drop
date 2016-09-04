function QuickAddController($http, $log, $rootScope) {
	var ctrl = this;

	const collectionLinksResource = `/collection/${ctrl.collectionKey}/links`;

	const domParser = new DOMParser();

	function reloadLinks() {
		$http.get(`/collection/${ctrl.collectionKey}/view`)
			.then((response) => {
				const parsedHtml = domParser.parseFromString(response.data, 'text/html');
				const linksElement = parsedHtml.querySelector('#links-list');

				angular.element('#links-list').replaceWith(linksElement);
			}, (response) => {
				$log.error('Failed to re-read page');
			})
	}

	ctrl.addLink = function(url) {
		$http.put(collectionLinksResource, {link: url})
			.then((response) => {
				$log.debug('Link saved successfully');
				ctrl.url = undefined;
				reloadLinks();
			}, (response) => {
				$log.error('Failed to save the link');
			});
	}
};

const ldQuickAdd = {
	controller: QuickAddController,
	templateUrl: '/static/components/controls/quick-add.html',
	bindings: {
		collectionKey: '@'
	}
}

module.exports = ldQuickAdd;