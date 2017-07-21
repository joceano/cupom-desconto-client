/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: NovoUsuarioDialogController, controller da tela Novo Usuário acessada pelo login.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('NovoUsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastr',
        function(scope, httpService, mdDialog, locals, toastr) {

        scope.senha     = '';
        scope.novaSenha = '';	

        /**
         * Finaliza o modal.
         **/
        scope.cancel = function() {
            mdDialog.cancel();
        }

        /**
         * Envia requisição para a API para salvar o novo usuário.
         **/
        scope.save = function(usuario, password) {            
            usuario.enabled = true;            
            httpService.post('/user/novo/'+password, usuario).then(function(res) {
                mdDialog.hide(usuario);  
                toastr.info(res.data);
            }, function (error) {
               toastr.error('Não foi possível salvar o registro.');
            });
        }

    }]);

})(window.angular);