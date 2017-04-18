(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('CupomDialogController', ['$scope','locals','$mdDialog',
        function(scope, locals, mdDialog) {
        
        scope.cupom = locals || {};

        scope.cancel = function() {
            mdDialog.cancel();
        };
        

    }]);

})(window.angular);