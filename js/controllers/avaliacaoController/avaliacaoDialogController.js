(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('AvaliacaoDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) { 

        var getAvaliacao = function() {
            scope.loading = true;
            httpService.post('/avaliacao/nota/', locals).then(function(res) {
                scope.avaliacao = res.data;
                if (!scope.avaliacao) {
                    scope.avaliacao = {"id" : null, "cupom" : {"id" : locals.id}, "nota" : 0, "mensagem" : null};
                }
                scope.loading = false;
            }, function (error) {
               toastAlert.defaultToaster('Ops, não foi possível carregar a avaliação.');
            });
        }
        
        scope.cancel = function() {
            mdDialog.cancel();
        }

        scope.save = function(avaliacao) {
        var confirm = mdDialog.confirm({multiple: true})
            .title('Deseja enviar a sua avaliação Nota ' + avaliacao.nota + '.0?')         
            .ariaLabel('')
            .targetEvent(null)
            .ok('Confirmar')
            .cancel('Cancelar');

            mdDialog.show(confirm).then(function() {
                httpService.post('/avaliacao/', avaliacao).then(function(res) {
                    scope.avaliacao.id = res.data.id;
                    mdDialog.hide(scope.avaliacao);
                    if (scope.avaliacao.id) {
                        toastAlert.defaultToaster('Obrigado pela sua avaliação.');
                    }                     
                }, function (error) {
                   toastAlert.defaultToaster('Ops, não foi possível gravar a avaliação');
                });
            }, function() {
                //Cancelou
            });
        };

        getAvaliacao();

    }]);
})(window.angular);