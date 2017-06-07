(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('AnuncioController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastAlert', '$mdDialog',
	    function(scope, modalService, httpService, timeout, toastAlert, mdDialog) { 

        scope.anuncios = [];

        scope.isAtivo = function(anuncio) {
            if (anuncio.ativo) {
                return 'Ativo'
            } else {
                return 'Inativo';
            }            
        }

        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        var width = screen.width;        
        if (mq.matches) {
            scope.substring = 17;
        }

        scope.$on('pushAnuncio', function(e, anuncio){
            scope.anuncios.push(anuncio);
        })

        var getAnuncios = function() {
            scope.loading = true;
            httpService.get('/anuncio/').then(function(res) {                
                scope.anuncios = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar os anúncios.');
            });
        };

        scope.openDialog = function(ev, anuncio) {
            var anuncioCopia = angular.copy(anuncio)
            modalService.openDialog(
                'partials/components/dialog/anuncioDialog.html', 'AnuncioDialogController',
                callBack, ev, anuncioCopia
            );
        }

        scope.openDialogList = function(ev, anuncio) {            
            modalService.openDialog(
                'partials/components/dialog/cupomDialogList.html', 'CupomDialogListController',
                callBack, ev, anuncio
            );
        }

        var callBack = function(anuncio) {            
            scope.anuncios.filter( function( elemento, index ) {
                if (elemento.id == anuncio.id) {                    
                    if (anuncio.valueOf == -1) {
                        scope.anuncios.splice(index, 1);    
                    } else {
                        scope.anuncios[index] = anuncio;
                    }
                }
            })            
        };

        getAnuncios();

	}]);
})(window.angular);