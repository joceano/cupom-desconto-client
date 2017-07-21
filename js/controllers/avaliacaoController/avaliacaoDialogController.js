/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: AvaliacaoDialogController, controller do modal de avaliação de cupons.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('AvaliacaoDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastr',
        function(scope, httpService, mdDialog, locals, toastr) { 

        /**
         * Faz requisição para a API para retornar a avaliação.
         **/    
        var getAvaliacao = function() {
            scope.loading = true;
            httpService.post('/avaliacao/nota/', locals).then(function(res) {
                scope.avaliacao = res.data;
                if (!scope.avaliacao) {
                    scope.avaliacao = {"id" : null, "cupom" : {"id" : locals.id}, "nota" : 0, "mensagem" : null};
                }
                scope.loading = false;
            }, function (error) {
               toastr.error('Não foi possível carregar a avaliação.');
            });
        }
        
        /**
         * Finaliza o modal.
         **/
        scope.cancel = function() {
            mdDialog.cancel();
        }

        /**
         * Envia requisição para a API para salvar a avaliação.
         **/
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
                        toastr.success('Avaliação realizada com sucesso.');
                    }                     
                }, function (error) {
                   toastr.error('Não foi possível salvar a avaliação.');
                });
            }, function() {
                //Cancelou
            });
        };

        getAvaliacao();

    }]);
})(window.angular);