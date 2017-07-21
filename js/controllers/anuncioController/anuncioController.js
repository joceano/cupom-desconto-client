/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: AnuncioController, controller da lista de anúncios.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('AnuncioController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastr', '$mdDialog',
	    function(scope, modalService, httpService, timeout, toastr, mdDialog) { 

        scope.anuncios = [];
        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        scope.$on('pushAnuncio', function(e, anuncio){
            scope.anuncios.push(anuncio);
        })

        /**
         * Se a resolução da tela for menor que 680px, limita a string na lista de anúncios.
         **/
        if (mq.matches) {
            scope.substring = 17;
        }

        /**
         * Trata label de anúncio Ativo ou Inativo.
         **/
        scope.isAtivo = function(anuncio) {
            if (anuncio.ativo) {
                return 'Ativo'
            } else {
                return 'Inativo';
            }            
        }

        /**
         * Faz requisição para a API para retornar os anúncios cadastrados.
         **/
        var getAnuncios = function() {
            scope.loading = true;
            httpService.get('/anuncio/').then(function(res) {                
                scope.anuncios = res.data; 
                scope.loading = false;                
            }, function (error) {
                toastr.error('Não foi possível carregar os anúncios.');
            });
        };

        /**
         * Abre o modal para a manutenção de anúncios.
         **/ 
        scope.openDialog = function(ev, anuncio) {
            var anuncioCopia = angular.copy(anuncio)
            modalService.openDialog(
                'partials/components/dialog/anuncioDialog.html', 'AnuncioDialogController',
                callBack, ev, anuncioCopia
            );
        }

        /**
         * Abre o modal para a manutenção de cupons dos usuários(Finalizar o cupom para liberar a avaliação).
         **/ 
        scope.openDialogList = function(ev, anuncio) {            
            modalService.openDialog(
                'partials/components/dialog/cupomDialogList.html', 'CupomDialogListController',
                callBack, ev, anuncio
            );
        }

        /**
         * Função callBack executada ao salvar o anúncio.
         **/ 
        var callBack = function(anuncio) {            
            scope.anuncios.filter( function( elemento, index ) {
                if (elemento.id == anuncio.id) {                    
                    scope.anuncios[index] = anuncio;
                }
            })            
        };

        getAnuncios();

	}]);
})(window.angular);