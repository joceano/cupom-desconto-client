/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: NovoUsuarioDialogController, controller da tela Novo Usuário acessada pelo login.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('NovoUsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {

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
                toastAlert.defaultToaster(res.data);
            }, function (error) {
               toastAlert.defaultToaster('Ops, não foi possível gravar o usuario ' + usuario.name);
            });
        }

    }]);

})(window.angular);