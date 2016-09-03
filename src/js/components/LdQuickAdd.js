function QuickAddController($http, $log, $rootScope) {
	var ctrl = this;

	const collectionLinksResource = `/collection/${ctrl.collectionKey}/links`;

	$log.debug(collectionLinksResource);

	function reloadLinks() {
		$http.get(`/collection/${ctrl.collectionKey}/view`)
			.then((response) => {
				$log.debug(response.data);
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