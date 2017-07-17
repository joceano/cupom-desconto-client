/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: UsuarioController, controller da lista de usuários.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('UsuarioController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastAlert',
	    function(scope, modalService, httpService, timeout, toastAlert) { 

        scope.usuarios = [];
        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );      
        
        /**
         * Se a resolução da tela for menor que 680px, limita a string na lista de usuários
         **/
        if (mq.matches) {
            scope.substring = 17;
        }

        /**
         * Faz requisição para a API para retornar os usuários cadastrados.
         **/
        var getUsuarios = function() {
            scope.loading = true;
            httpService.get('/user/').then(function(res) {                
                scope.usuarios = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar os usuários.');
            });
        };

        /**
         * Abre o modal para a manutenção de usuários.
         **/    
        scope.openDialog = function(ev, usuario) {
            var usuarioCopia = angular.copy(usuario)
            modalService.openDialog(
                'partials/components/dialog/usuarioDialog.html', 'UsuarioDialogController',
                callBack, ev, usuarioCopia
            );
        }

        /**
         * Função de callBack executada ao salvar o registro no modal.
         **/
        var callBack = function(usuario) {            
            scope.usuarios.filter( function( elemento, index ) {
                if (elemento.id == usuario.id) {                    
                    scope.usuarios[index] = usuario;
                }
            })            
        };

        getUsuarios();

	}]);
})(window.angular);