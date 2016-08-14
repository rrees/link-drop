const linkDropApp = angular.module('linkDropApp', []);

const ldCollectionControls = require('./components/LdCollectionControls');
const ldLatestCollections = require('./components/LdLatestCollections');
const ldQuickControls = require('./components/LdQuickControls');

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections)
	.component('ldCollectionControls', ldCollectionControls);