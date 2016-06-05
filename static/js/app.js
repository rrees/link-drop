const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($http, $log) {
	var ctrl = this;

	ctrl.data = {
		collections: []
	};

	ctrl.addLinkForm = {
		link: undefined,
		collection: undefined
	}

	$http.get('/collections').then((response) => {
		$log.info(response.data);
		ctrl.data.collections = response.data.collections;
		ctrl.addLinkForm.collection = ctrl.data.collections[0];
	})
	
	ctrl.showAddLink = function() {
		return ctrl.data.collections && ctrl.data.collections.length > 0;
	}

	ctrl.addCollection = function(collection) {
		$log.info('Form submitted', collection);
		$log.info('Collection name', collection.name);
		$http.put('/collections/new', {name: collection.name});
	}

	ctrl.addLink = function(data) {
		$log.info('Adding a link');
		$log.info('Form data', data);
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