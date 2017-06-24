(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('VerMaisDialogController', 
        ['$scope','$mdDialog', 'locals',
        function(scope, mdDialog, locals) {
        
        scope.anuncio = locals || {};
        
        scope.cancel = function() {
            mdDialog.cancel();
        }

    }]);

})(window.angular);