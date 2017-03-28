(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CuponsController', ['$scope','modalService', 
        function(scope, modalService) {
    
        scope.openDialog = function(ev, cupom) {
            var cupomCopia = angular.copy(cupom)
            modalService.openDialog(
                'partials/components/dialog/cupomDialog.html', 'CuponsDialogController',
                callBack, ev, cupomCopia
            );
        };

        var callBack = function(e) {
            console.log(e + "fechou o modal!")
        };

	}]);
})(window.angular);