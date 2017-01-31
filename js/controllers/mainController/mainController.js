(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('MainController', ['$scope', '$mdSidenav','$location','LoginService',
	 function(scope, mdSidenav, location, loginService) {

		scope.mainMenuItems = [
			{
				label: "Home",
				location: "home",
				icon: 'home',
			}, 
			{
				label: "Contato",
				location: "contato",
				icon: 'email',
			}
		];  

		scope.toggleSidenav = function(menu) {
			mdSidenav(menu).toggle();
		}

		scope.gotoSection = function (routeToGo) {
			mdSidenav('left').toggle();
			location.url(routeToGo);
		};

		scope.logout = function () {
			loginService.logout();
		}
	}]);

})(window.angular);