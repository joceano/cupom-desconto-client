(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('UsuarioController', 
        ['$scope','modalService','HttpService', '$timeout', 'toastAlert',
	    function(scope, modalService, httpService, timeout, toastAlert) { 

        scope.usuarios = [];

        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        var width = screen.width;        
        if (mq.matches) {
            scope.substring = 17;
        }

        var getUsuarios = function() {
            scope.loading = true;
            httpService.get('/user/').then(function(res) {                
                scope.usuarios = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar os usuários.');
            });
        };

        scope.openDialog = function(ev, usuario) {
            var usuarioCopia = angular.copy(usuario)
            modalService.openDialog(
                'partials/components/dialog/usuarioDialog.html', 'UsuarioDialogController',
                callBack, ev, usuarioCopia
            );
        }

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