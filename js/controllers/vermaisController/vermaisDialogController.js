/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: VerMaisDialogController, controller da tela verMais acessada pelo Home.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('VerMaisDialogController', 
        ['$scope','$mdDialog', 'locals',
        function(scope, mdDialog, locals) {
        
        scope.endereco = 'UTFPR, Pato Branco - PR';

        scope.anuncio = locals || {};

        if (locals.usuario.telefone) {
            if (locals.usuario.telefone.length > 10) {
            	scope.fone = '(' + locals.usuario.telefone.substring(0,2) + ')' + 
            			  locals.usuario.telefone.substring(2,7) + '-' +
            			  locals.usuario.telefone.substring(7,11);	
            } else {
            	scope.fone = '(' + locals.usuario.telefone.substring(0,2) + ')' + 
            			  locals.usuario.telefone.substring(2,6) + '-' +
            			  locals.usuario.telefone.substring(6,10);
            }
        }
        
        /**
         * Finaliza o modal.
         **/
        scope.cancel = function() {
            mdDialog.cancel();
        }

    }]);

})(window.angular);