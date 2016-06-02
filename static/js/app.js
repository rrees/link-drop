const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($scope, $http, $log) {
	var ctrl = this;

	$scope.collection = [];

	$http.get('/collections').then((response) => {
		$log.info(response.data);
		$scope.collection = response.data.collections;
	})
	
	ctrl.showAddLink = function() {
		return $scope.collection && $scope.collection.length > 0;
	}

	ctrl.addCollection = function(collection) {
		$log.info('Form submitted', collection);
		$log.info('Collection name', collection.name);
		$http.put('/collections/new', {name: collection.name});
	}
}

const ldQuickControls = {
	templateUrl: '/static/components/controls/quick.html',
	controller: QuickControlsController
}

function LatestCollectionsController($log, $http) {
	const ctrl = this;

	ctrl.collections = [];

	$log.info('Latest controller');

	$http.get('/collections/recent').then((response) => {
		$log.info(response);
		ctrl.collections = response.data.collections;
	});
}

const ldLatestCollections = {
	templateUrl: '/static/components/collections/latest.html',
	controller: LatestCollectionsController
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections);