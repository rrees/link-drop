const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($http, $log, $rootScope) {
	var ctrl = this;

	ctrl.data = {
		collections: []
	};

	ctrl.name = undefined;

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

	function resetCollectionForm(ctrl) {
		$log.info(ctrl);
		ctrl.name = undefined;
	}

	loadCollections();
	
	ctrl.showAddLink = function() {
		return ctrl.data.collections && ctrl.data.collections.length > 0;
	}

	ctrl.addCollection = function() {

		$http.put('/collections/new', {name: ctrl.name})
			.then((response) => {
				loadCollections();
				$rootScope.$emit('ld:collection-created');
				resetCollectionForm(ctrl);
			}, (response) => $log.error('Collection creation failed', response));

	}

	ctrl.addLink = function(data) {
		$log.info('Adding a link');
		$log.info('Form data', data);
		$http.put('/collection/' + data.collection.id + '/links', {link: data.link})
			.then((response) => {
				$log.info('Link added');
				resetLinkForm(ctrl);
				$rootScope.$emit("ld:link-added");
			}, (response) => $log.error('Link addition failed', response));
	}
}

const ldQuickControls = {
	templateUrl: '/static/components/controls/quick.html',
	controller: QuickControlsController
}

function LatestCollectionsController($log, $http, $rootScope, $timeout) {
	const ctrl = this;

	ctrl.collections = [];

	$log.info('Latest controller');

	function loadLatestCollections(ctrl) {
		$http.get('/collections/recent').then((response) => {
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

function CollectionControlsController($log, $http, $location) {
	const ctrl = this;

	function setLabel(flag) {
		if(flag) {
			return "Make private";
		} else {
			return "Make public";
		}
	}

	ctrl.buttonLabel = setLabel(ctrl.initialVisibility == 'True')	

	ctrl.togglePublic = function() {
		$http.put('/collection/' + ctrl.collectionKey + '/public')
			.then((response) => {
				ctrl.buttonLabel = setLabel(response.data.public);
			}, (response) => {
				$log.error('Failed to toggle collection visibility', response);
			});
	}

	ctrl.delete = function() {
		$http.delete('/collection/' + ctrl.collectionKey)
			.then( (response) => {
				window.location = '/home';
			}, (response) => {
				$log.error('Failed to delete collection', response);
			})
	}

}

const ldCollectionControls = {
	templateUrl: '/static/components/collections/controls.html',
	controller: CollectionControlsController,
	bindings: {
		collectionKey: '@',
		initialVisibility: '@'
	}
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls);