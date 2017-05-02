(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('UsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {

        const _RoleAdmin = 'ROLE_ADMIN';
        const _RoleUser  = 'ROLE_USER';    
        
        scope.senha     = '';
        scope.novaSenha = '';
        scope.usuario   = locals || {};        
        setarRoles();

        function setarRoles() {
            if (scope.usuario.roles == _RoleAdmin) {
                scope.role = true;
            } else {
                scope.role = false;
            }
        }

        function tratarRoles(usuario, role) {
            if (role) {
                usuario.roles = _RoleAdmin;
            } else {
                usuario.roles = _RoleUser;
            }
        }
        
        scope.cancel = function() {
            mdDialog.cancel();
        }

        scope.save = function(usuario, password, role) {
            scope.loading = true;
            tratarRoles(usuario, role)            
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