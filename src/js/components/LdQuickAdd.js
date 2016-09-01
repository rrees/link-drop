function QuickAddController($http, $log, $rootScope) {
	var ctrl = this;

	$log.debug('Hello from quick add');

	ctrl.addLink = function(url) {
		console.log(url);
		console.log(ctrl.collectionKey);
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