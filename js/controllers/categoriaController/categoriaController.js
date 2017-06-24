(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastAlert',
	    function(scope, modalService, httpService, timeout, toastAlert) { 

        scope.categorias = [];

        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        var width = screen.width;        
        if (mq.matches) {
            scope.substring = 17;
        }

        scope.$on('pushCategoria', function(e, categoria){
            scope.categorias.push(categoria);
        })

        var getCategorias = function() {
            scope.loading = true;
            httpService.get('/categoria/').then(function(res) {                
                scope.categorias = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar as categorias.');
            });
        };

        scope.openDialog = function(ev, categoria) {
            var categoriaCopia = angular.copy(categoria)
            modalService.openDialog(
                'partials/components/dialog/categoriaDialog.html', 'CategoriaDialogController',
                callBack, ev, categoriaCopia
            );
        }

        var callBack = function(categoria) {            
            scope.categorias.filter( function( elemento, index ) {
                if (elemento.id == categoria.id) {                    
                    scope.categorias[index] = categoria;
                }
            })            
        };

        getCategorias();

	}]);
})(window.angular);