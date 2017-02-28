(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaController', 
        ['$scope','modalService','HttpService', '$timeout',
	    function(scope, modalService, httpService, timeout) {

        scope.categorias = [];

        var getCategorias = function() {
            scope.loading = true;
            httpService.get('/categoria/').then(function(res) {
                scope.loading = false;
                scope.categorias = res.data;                 
            });
        };

        scope.openDialog = function(ev, categoria) {
            var categoriaCopia = angular.copy(categoria)
            modalService.openDialog(
                'partials/dialog/categoriaDialog.html', 'CategoriaDialogController',
                callBack, ev, categoriaCopia
            );
        };

        var callBack = function(categoria) {
            var novoReg = true;
            scope.categorias.filter( function( elemento, index ) {
                if (elemento.id == categoria.id) {
                    novoReg = false;
                    if (categoria.valueOf == -1) {
                        scope.categorias.splice(index, 1);    
                    } else {
                        scope.categorias[index] = categoria;
                    };
                };
            });
            if (novoReg) {
                scope.categorias.push(categoria);
            };
        };          

        getCategorias();

	}]);
})(window.angular);