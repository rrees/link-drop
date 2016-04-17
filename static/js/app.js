const linkDropApp = angular.module('linkDropApp', []);

function ldQuickControls() {
	return {
		template: '<p>Controls</p>'
	}
}

function ldLatestCollections() {
	return {
		template: '<p>Latest Collections</p>'
	}
}

linkDropApp
	.directive('ldQuickControls', ldQuickControls)
	.directive('ldLatestCollections', ldLatestCollections);