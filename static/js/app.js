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

	function loadCollections() {
		$http.get('/collections').then((response) => {
			$log.info(response.data);
			ctrl.data.collections = response.data.collections;
			ctrl.addLinkForm.collection = ctrl.data.collections[0];
		});
	}

	function resetLinkForm(ctrl) {
		ctrl.addLinkForm.link = undefined;
	}

	loadCollections();
	
	ctrl.showAddLink = function() {
		return ctrl.data.collections && ctrl.data.collections.length > 0;
	}

	ctrl.addCollection = function(collection) {
		$log.info('Form submitted', collection);
		$log.info('Collection name', collection.name);
		$http.put('/collections/new', {name: collection.name})
			.then((response) => loadCollections(),
				(response) => $log.error('Collection creation failed', response));

	}

	ctrl.addLink = function(data) {
		$log.info('Adding a link');
		$log.info('Form data', data);
		$http.put('/collection/' + data.collection.id + '/links', {link: data.link})
			.then((response) => {
				$log.info('Link added');
				resetLinkForm(ctrl);
			}, (response) => $log.error('Link addition failed', response));
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

function CollectionControlsController($log, $http) {
	const ctrl = this;

	$log.info(ctrl.collectionKey);

	ctrl.togglePublic = function() {
		$http.put('/collection/' + ctrl.collectionKey + '/public')
	}

}

const ldCollectionControls = {
	templateUrl: '/static/components/collections/controls.html',
	controller: CollectionControlsController,
	bindings: {
		collectionKey: '@'
	}
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls);