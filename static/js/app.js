const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($scope) {
	var ctrl = this;

	$scope.collection = [];
	
	ctrl.showAddLink = function() {
		return $scope.collection && $scope.collection.length > 0;
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