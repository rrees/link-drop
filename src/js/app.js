const linkDropApp = angular.module('linkDropApp', []);

function QuickControlsController($http, $log, $rootScope) {
	var ctrl = this;

	const collectionsUrl = '/api/collections';
	const newCollectionUrl = '/api/collections/new';
	
	function linksListResource(id) {
		return `/collection/${id}/links`;
	}

	ctrl.data = {
		collections: []
	};

	ctrl.name = undefined;

	ctrl.addLinkForm = {
		link: undefined,
		collection: undefined
	}

	function loadCollections() {
		$http.get(collectionsUrl).then((response) => {
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

		$http.put(newCollectionUrl, {name: ctrl.name})
			.then((response) => {
				loadCollections();
				$rootScope.$emit('ld:collection-created');
				resetCollectionForm(ctrl);
			}, (response) => $log.error('Collection creation failed', response));

	}

	ctrl.addLink = function(data) {
		$log.info('Adding a link');
		$log.info('Form data', data);
		$http.put(linksListResource(data.collection.id), {link: data.link})
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

const ldCollectionControls = require('./components/LdCollectionControls');
const ldLatestCollections = require('./components/LdLatestCollections');

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls);