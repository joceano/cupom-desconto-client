(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('NovoUsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {

        scope.senha     = '';
        scope.novaSenha = '';	

        scope.cancel = function() {
            mdDialog.cancel();
        }

        scope.save = function(usuario, password) {            
            usuario.enabled = true;            
            httpService.post('/user/'+password, usuario).then(function(res) {
                mdDialog.hide(usuario);  
                toastAlert.defaultToaster('O usuário ' + usuario.name + ' foi salvo com sucesso.');
            }, function (error) {
               toastAlert.defaultToaster('Ops, não foi possível gravar o usuario ' + usuario.name);
            });
        }

    }]);

})(window.angular);