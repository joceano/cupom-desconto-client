/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: UsuarioDialogController, controller da manutenção de usuários.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('UsuarioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastr',
        function(scope, httpService, mdDialog, locals, toastr) {

        const _RoleAdmin = 'ROLE_ADMIN';
        const _RoleUser  = 'ROLE_USER';    
        
        scope.senha     = '';
        scope.novaSenha = '';
        scope.usuario   = locals || {};        
        setarRoles();

        /**
         * Privilégios do usuário utilizado para tratamentos na manutenção de usuários
         **/    
        function setarRoles() {
            if (scope.usuario.roles == _RoleAdmin) {
                scope.role = true;
            } else {
                scope.role = false;
            }
        }

        /**
         * Privilégios do usuário.
         **/
        function tratarRoles(usuario, role) {
            if (role) {
                usuario.roles = _RoleAdmin;
            } else {
                usuario.roles = _RoleUser;
            }
        }
        
        /**
         * Finaliza o modal.
         **/
        scope.cancel = function() {
            mdDialog.cancel();
        }

        /**
         * Envia requisição para a API para salvar o usuário.
         **/
        scope.save = function(usuario, password, role) {
            scope.loading = true;
            tratarRoles(usuario, role)            
            httpService.post('/user/'+password, usuario).then(function(res) {
                scope.loading = false;
                usuario.id = res.data.id;
                mdDialog.hide(usuario);  
                toastr.success('Registro salvo com sucesso.');                        
            }, function (error) {
               scope.loading = false; 
               toastr.error('Não foi possível salvar o registro.');           
            });
        }
    }]);

})(window.angular);