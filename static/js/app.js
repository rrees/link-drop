const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($scope, $http, $log) {
	var ctrl = this;

	$scope.collection = [];

	$http.get('/collections').then((data) => $log.debug(data))
	
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

const ldLatestCollections = {
	templateUrl: '/static/components/collections/latest.html'
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections);