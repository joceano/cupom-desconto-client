(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('HomeController', ['$scope', 'HttpService',
	 function(scope, httpService) {
	 	
	 	var getAnuncios = function() {
            scope.loading = true;
            httpService.get('/home/').then(function(res) {                
                scope.anuncios = res.data; 
                scope.loading = false;                
            }, function (error) {                
                toastAlert.defaultToaster('Ops, não foi possível carregar os anúncios.');
            });
        };	 

        getAnuncios();			 

	}]);

})(window.angular);