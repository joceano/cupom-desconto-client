(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
	    function(scope, httpService, mdDialog, locals, toastAlert) {
	 	
        scope.categoria = locals || {};
        
        scope.cancel = function() {
            mdDialog.cancel();
        };

        scope.save = function(categoria) {
            scope.loading = true;
            httpService.post('/categoria/', categoria).then(function(res) {
                scope.loading = false;
                categoria.id = res.data.id;
                mdDialog.hide(categoria);  
                toastAlert.defaultToaster('Salvo com sucesso!');          
            });
        };

        scope.delete = function (categoria) {
            httpService.delete('/categoria/'+categoria.id).then(function(res) {                
                categoria.valueOf = -1;
                mdDialog.hide(categoria);
                toastAlert.defaultToaster('Excluído com sucesso!');
            });
        };

	}]);

})(window.angular);