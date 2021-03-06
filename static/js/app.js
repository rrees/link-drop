/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {


function AddCollectionController($log, $http, $location) {
	var ctrl = this;

	const newCollectionUrl = '/api/collections/new';

	ctrl.name = undefined;

	function resetCollectionForm(ctrl) {
		ctrl.name = undefined;
	}

	ctrl.addCollection = function() {

		$http.put(newCollectionUrl, {name: ctrl.name})
			.then((response) => {
				resetCollectionForm(ctrl);
				setTimeout(() => document.location.reload(true), 250);
			}, (response) => $log.error('Collection creation failed', response));

	}

}

const ldAddCollection = {
	controller: AddCollectionController,
	templateUrl: '/static/components/controls/add-collection.html',
	bindings: {
	}
}

module.exports = ldAddCollection;

/***/ }),
/* 1 */
/***/ (function(module, exports) {


function CollectionControlsController($log, $http, $location) {
	const ctrl = this;

	function collectionPublicResource(collectionKey) {
		return  `/collection/${collectionKey}/public`;
	}

	function collectionResource(collectionKey) {
		return '/collection/' + collectionKey;
	}

	function setLabel(flag) {
		if(flag) {
			return "Make private";
		} else {
			return "Make public";
		}
	}

	ctrl.buttonLabel = setLabel(ctrl.initialVisibility == 'True')	

	ctrl.togglePublic = function() {
		$http.put(collectionPublicResource(ctrl.collectionKey))
			.then((response) => {
				ctrl.buttonLabel = setLabel(response.data.public);
			}, (response) => {
				$log.error('Failed to toggle collection visibility', response);
			});
	}

	ctrl.delete = function() {
		$http.delete(collectionResource(ctrl.collectionKey))
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

module.exports = ldCollectionControls;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
		if(!url) {
			return;
		}
		
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


module.exports = ldQuickControls;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const linkDropApp = angular.module('linkDropApp', []);

const ldCollectionControls = __webpack_require__(1);
const ldLatestCollections = __webpack_require__(2);
const ldQuickControls = __webpack_require__(4);
const ldQuickAdd = __webpack_require__(3);
const ldAddCollection = __webpack_require__(0);

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls)
	.component('ldQuickAdd', ldQuickAdd)
	.component('ldAddCollection', ldAddCollection);

/***/ })
/******/ ]);