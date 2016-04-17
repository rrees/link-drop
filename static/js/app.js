const linkDropApp = angular.module('linkDropApp', []);

const ldQuickControls = {
	template: '<p>Controls</p>'
}

const ldLatestCollections = {
	template: '<p>Latest Collections</p>'
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections);