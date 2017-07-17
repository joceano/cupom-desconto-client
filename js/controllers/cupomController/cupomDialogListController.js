/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: CupomDialogListController, controller do modal com a lista de cupons do anúncio.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CupomDialogListController', 
        ['$scope','HttpService', 'modalService', '$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, modalService, mdDialog, locals, toastAlert) {

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
            httpService.post('/cupom/anuncios/', locals).then(function(res) {
                scope.cupons = res.data;                          
                scope.loading = false;
            }, function (error) { 
               toastAlert.defaultToaster('Ops, não foi possível carregar os cupons.');
            });
        }

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
         * Faz requisição para a API para finalizar o cupom.
         **/ 
        scope.finalizarCupom = function(ev, cupom) {
        var confirm = mdDialog.confirm({multiple: true})
            .title('Deseja realmente finalizar o cupom do usuário ' + cupom.usuario.username + '?')
            .ariaLabel('')
            .targetEvent(ev)
            .ok('Confirmar')
            .cancel('Cancelar');

            mdDialog.show(confirm).then(function() {
                cupom.baixado = true;
                httpService.post('/cupom/', cupom).then(function(res) {                 
                    toastAlert.defaultToaster('Cupom do usuario '+cupom.usuario.username+
                        ' finalizado com sucesso!');
                }, function (error) {
                    toastAlert.defaultToaster('Ops, não foi possível finalizar o cupom do usuário '+
                        cupom.usuario.username+'!');
                });
            }, function() {
                //Cancelou
            });
        };

        /**
         * Finaliza o modal.
         **/ 
        scope.cancel = function() {
            mdDialog.cancel();
        }

        getCupons();

    }]);
})(window.angular);