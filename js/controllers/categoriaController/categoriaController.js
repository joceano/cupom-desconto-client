/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: CategoriaController, controller da lista de categorias.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CategoriaController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastAlert',
	    function(scope, modalService, httpService, timeout, toastAlert) { 

        scope.categorias = [];
        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        scope.$on('pushCategoria', function(e, categoria){
            scope.categorias.push(categoria);
        })

        /**
         * Se a resolução da tela for menor que 680px, limita a string na lista de categorias.
         **/ 
        if (mq.matches) {
            scope.substring = 17;
        }

        /**
         * Faz requisição para a API para retornar as categorias cadastradas.
         **/ 
        var getCategorias = function() {
            scope.loading = true;
            httpService.get('/categoria/').then(function(res) {                
                scope.categorias = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar as categorias.');
            });
        };

        /**
         * Abre o modal para a manutenção de categorias.
         **/ 
        scope.openDialog = function(ev, categoria) {
            var categoriaCopia = angular.copy(categoria)
            modalService.openDialog(
                'partials/components/dialog/categoriaDialog.html', 'CategoriaDialogController',
                callBack, ev, categoriaCopia
            );
        }

        /**
         * Função callBack executada ao salvar a categoria.
         **/
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