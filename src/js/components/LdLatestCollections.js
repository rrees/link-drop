function LatestCollectionsController($log, $http, $rootScope, $timeout) {
	const ctrl = this;

	const latestCollectionsUrl = '/api/collections/recent';
	ctrl.collections = [];

	$log.info('Latest controller');

	function loadLatestCollections(ctrl) {
		$http.get(latestCollectionsUrl).then((response) => {
			$log.info(response);
			ctrl.collections = response.data.collections;
		});
	}

	loadLatestCollections(ctrl);
	
	$rootScope.$on('ld:link-added', (event) => {
		$log.info('Latest collections updating');
		$timeout(() => loadLatestCollections(ctrl), 500);
	});

	$rootScope.$on('ld:collection-created', (event) => {
		$log.info('Collection created event detected');
		$timeout(() => loadLatestCollections(ctrl), 500);
	});
}

const ldLatestCollections = {
	templateUrl: '/static/components/collections/latest.html',
	controller: LatestCollectionsController
}

module.exports = ldLatestCollections;