(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('UsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {
        
        scope.senha     = '';
        scope.novaSenha = '';
        scope.usuario   = locals || {};
        scope.usuario.enabled = true;
        scope.alterarSenha    = false;
        
        scope.cancel = function() {
            mdDialog.cancel();
        }

        scope.limparSenhas = function () {
            scope.senha     = '';
            scope.novaSenha = '';
        }

        scope.save = function(usuario, password) {
            scope.loading = true;            
            httpService.post('/user/'+password, usuario).then(function(res) {
                scope.loading = false;
                usuario.id = res.data.id;
                mdDialog.hide(usuario);                          
            }, function (error) {
               scope.loading = false; 
               toastAlert.defaultToaster('Ops, não foi possível gravar o usuario ' + usuario.name);           
            });
        }

        scope.delete = function (usuario) {
            httpService.delete('/user/'+usuario.id).then(function(res) {                
                usuario.valueOf = -1;
                mdDialog.hide(usuario);                
            }, function (error) {
                toastAlert.defaultToaster('Ops, não foi possível excluir o usuario ' + usuario.name); 
            });
        }

    }]);

})(window.angular);