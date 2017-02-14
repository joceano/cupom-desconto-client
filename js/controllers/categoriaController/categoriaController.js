(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaController', ['$scope','modalService','HttpService',
	 function(scope, modalService, httpService) {
	 	
         scope.teste = 'teste'
         scope.categorias = [];

         var getCategorias = function() {
             scope.loading = true;
             httpService.get('/categoria/').then(function(res) {
                 scope.loading = false;
                 scope.categorias = res.data;
             });
         };

         scope.openDialog = function(categoria, ev) {
            modalService.openDialog(
                'partials/dialog/categoriaDialog.html', 'CategoriaDialogController',
                callBack, ev, categoria
            );
         }

         var callBack = function(categoria) {
             var existe = false;
             for (var i = 0; i < scope.categorias.length; i++) {
                 if (scope.categorias[i].id == categoria.id) {
                     scope.categorias[i] = categoria;
                     existe = true;
                 }
             }
             if (!existe) {
                 scope.categorias.push(categoria);
             }
         };


         getCategorias();
	}]);

})(window.angular);