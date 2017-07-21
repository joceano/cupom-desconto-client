/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: CategoriaDialogController, controller do modal de manutenção de categorias.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CategoriaDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastr',
        function(scope, httpService, mdDialog, locals, toastr) {
        
        scope.categoria = locals || {};
        
        /**
         * Finaliza o modal.
         **/ 
        scope.cancel = function() {
            mdDialog.cancel();
        }

        /**
         * Faz requisição para a API para salvar a categoria.
         **/
        scope.save = function(categoria) {
            scope.loading = true;
            httpService.post('/categoria/', categoria).then(function(res) {
                scope.loading = false;
                categoria.id = res.data.id;
                mdDialog.hide(categoria);
                toastr.success('Registro salvo com sucesso.');
            }, function (error) {
               scope.loading = false;
               toastr.error('Não foi possível salvar o registro.');
            });
        }
    }]);
})(window.angular);