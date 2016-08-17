function QuickAddController($http, $log, $rootScope) {
	var ctrl = this;

	$log.debug('Hello from quick add');
};

const ldQuickAdd = {
	controller: QuickAddController,
	templateUrl: '/static/components/controls/quick-add.html',
	bindings: {
		collectionKey: '@'
	}
}

module.exports = ldQuickAdd;