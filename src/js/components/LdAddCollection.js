
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
		collectionKey: '@'
	}
}

module.exports = ldAddCollection;