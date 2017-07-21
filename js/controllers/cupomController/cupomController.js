/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: CupomController, controller da lista de cupons.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CupomController', 
        ['$scope','modalService', 'HttpService', '$timeout', 'toastr', 
        function(scope, modalService, httpService, timeout, toastr) {
    
        scope.cupons = [];
        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        /**
         * Se a resolução da tela for menor que 680px, limita a string na lista de cupons.
         **/
        if (mq.matches) {
            scope.substring = 17;
        }

        /**
         * Faz requisição para a API para retornar os cupons cadastrados.
         **/
        var getCupons = function() {
            scope.loading = true;
            httpService.get('/cupom/').then(function(res) {                
                scope.cupons = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastr.error('Não foi possível carregar os cupons.');
            });
        };

        /**
         * Abre o modal para a visualização do cupom.
         **/ 
        scope.openDialog = function(ev, cupom) {
            modalService.openDialog(
                'partials/components/dialog/cupomDialog.html', 'CupomDialogController',
                null, ev, cupom
            );
        }

        /**
         * Abre o modal para a avaliação do cupom.
         **/ 
        scope.openDialogAvaliacao = function(ev, cupom) {
            modalService.openDialog(
                'partials/components/dialog/avaliacaoDialog.html', 'AvaliacaoDialogController',
                callBack, ev, cupom
            );
        }

        /**
         * Função callBack executada ao salvar a avaliação. Deverá ser implementada se necessário.
         **/ 
        var callBack = function() {};

        getCupons();

	}]);
})(window.angular);