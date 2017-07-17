/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: CupomDialogController, controller do modal com a lista de cupons do anúncio.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CupomDialogController', ['$scope','locals','$mdDialog',
        function(scope, locals, mdDialog) {
        
        if (locals) {
            locals.data = new Date(locals.data);
            locals.anuncio.dataFinal = new Date(locals.anuncio.dataFinal);            
            scope.cupom = locals;
        } else {
            scope.anuncio = {};   
        }

        /**
         * Finaliza o modal.
         **/ 
        scope.cancel = function() {
            mdDialog.cancel();
        };

    }]);
})(window.angular);