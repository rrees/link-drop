const linkDropApp = angular.module('linkDropApp', []);

const ldQuickControls = {
	template: '<p>Controls</p>'
}

const ldLatestCollections = {
	templateUrl: '/static/components/collections/latest.html'
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections);