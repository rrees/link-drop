
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