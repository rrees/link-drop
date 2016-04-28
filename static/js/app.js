const linkDropApp = angular.module('linkDropApp', []);

const ldQuickControls = {
	templateUrl: '/static/components/controls/quick.html'
}

const ldLatestCollections = {
	templateUrl: '/static/components/collections/latest.html'
}

linkDropApp
	.component('ldQuickControls', ldQuickControls)
	.component('ldLatestCollections', ldLatestCollections);