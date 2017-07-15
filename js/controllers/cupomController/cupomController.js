(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('CupomController', 
        ['$scope','modalService', 'HttpService', '$timeout', 'toastAlert', 
        function(scope, modalService, httpService, timeout, toastAlert) {
    
        scope.cupons = [];

        scope.substring = 200;
        var mq = window.matchMedia( "(max-width: 680px)" );

        var width = screen.width;        
        if (mq.matches) {
            scope.substring = 17;
        }

        var getCupons = function() {
            scope.loading = true;
            httpService.get('/cupom/').then(function(res) {                
                scope.cupons = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar os cupons.');
            });
        };

        scope.openDialog = function(ev, cupom) {
            modalService.openDialog(
                'partials/components/dialog/cupomDialog.html', 'CupomDialogController',
                null, ev, cupom
            );
        }

        scope.openDialogAvaliacao = function(ev, cupom) {
            modalService.openDialog(
                'partials/components/dialog/avaliacaoDialog.html', 'AvaliacaoDialogController',
                callBack, ev, cupom
            );
        }

        var callBack = function() {            
                        
        };

        getCupons();

	}]);
})(window.angular);