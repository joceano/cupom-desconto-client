(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CupomDialogController', ['$scope','locals','$mdDialog',
        function(scope, locals, mdDialog) {
        
        if(locals) {
            locals.data = new Date(locals.data);
            locals.anuncio.dataFinal = new Date(locals.anuncio.dataFinal);            
            scope.cupom = locals;
        } else {
            scope.anuncio = {};   
        }

        scope.cancel = function() {
            mdDialog.cancel();
        };
        

    }]);

})(window.angular);