(function (angular) {
	'use strict';
	angular.module('app.controllers').controller('MainController', 
		['$scope', '$mdSidenav','$location','LoginService',
	 	function(scope, mdSidenav, location, loginService) {
		
		scope.$on('usuarioLogado', function(){
			getUsuarioLogado();			
		})		

		var getUsuarioLogado = function() {
			loginService.userLogged().then(function (result) {				
				scope.user = result.data;
			});
		};			 	
		 
		scope.titulo = "cupons.com"; 

		scope.menu = [
			{icon: 'menu', abrirMenu: "Abrir menu"}
		];

		scope.toggleSidenav = function(menu) {
			mdSidenav(menu).toggle();
		}

		scope.gotoSelection = function (routeToGo) {
			mdSidenav('left').toggle();
			location.url(routeToGo);
		}

		scope.logout = function () {
			loginService.logout();
			setTimeout(function(){
				scope.user = {};
				location.path("/home");
				mdSidenav('left').toggle();
			}, 50);			
		}	

		getUsuarioLogado();		

	}]);

})(window.angular);