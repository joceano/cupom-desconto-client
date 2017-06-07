(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CupomDialogListController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {

        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        var width = screen.width;        
        if (mq.matches) {
            scope.substring = 17;
        }    

        var getCupons = function() {
            scope.loading = true;
            httpService.post('/cupom/anuncios/', locals).then(function(res) {
                scope.loading = false;
                scope.cupons = res.data;                          
            }, function (error) {
               scope.loading = false; 
               toastAlert.defaultToaster('Ops, não foi possível carregar os cupons.');
            });
        }

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

        scope.cancel = function() {
            mdDialog.cancel();
        }

        getCupons();

    }]);

})(window.angular);