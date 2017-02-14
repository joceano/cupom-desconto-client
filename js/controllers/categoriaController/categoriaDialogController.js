(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaDialogController', ['$scope','HttpService','$mdDialog', 'locals',
	 function(scope, httpService, mdDialog,locals) {
	 	scope.categoria = locals || {};
        scope.cancel = function() {
            mdDialog.cancel();
        };

        scope.save = function(categoria) {
            scope.loading = true;
             httpService.post('/categoria/', categoria).then(function(res) {
                 scope.loading = false;
                 mdDialog.hide(categoria);
             });
        };

	}]);

})(window.angular);