const linkDropApp = angular.module('linkDropApp', []);

const ldCollectionControls = require('./components/LdCollectionControls');
const ldLatestCollections = require('./components/LdLatestCollections');
const ldQuickControls = require('./components/LdQuickControls');
const ldQuickAdd = require('./components/LdQuickAdd');
const ldAddCollection = require('./components/LdAddCollection');

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls)
	.component('ldQuickAdd', ldQuickAdd)
	.component('ldAddCollection', ldAddCollection);