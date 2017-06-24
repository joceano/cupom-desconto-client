(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CategoriaDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {
        
        scope.categoria = locals || {};
        
        scope.cancel = function() {
            mdDialog.cancel();
        }

        scope.save = function(categoria) {
            scope.loading = true;
            httpService.post('/categoria/', categoria).then(function(res) {
                scope.loading = false;
                categoria.id = res.data.id;
                mdDialog.hide(categoria);                          
            }, function (error) {
               scope.loading = false; 
               toastAlert.defaultToaster('Ops, não foi possível gravar a categoria ' + categoria.descricao);           
            });
        }
    }]);

})(window.angular);