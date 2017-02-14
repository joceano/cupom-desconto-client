(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('MainController', ['$scope', '$mdSidenav','$location','LoginService','$mdDialog',
	 function(scope, mdSidenav, location, loginService, mdDialog) {
	 	
		scope.$on('usuarioLogado', function(){
			getUsuarioLogado();
		});

		var getUsuarioLogado = function() {
			loginService.userLogged().then(function (result) {
				scope.user = result.data;
			});
		};
	 	

		scope.mainMenuItems = [
			{
				label: "Home",
				location: "home",
				icon: 'home',
				iconSeparator: 'chevron_right',
			}, 
			{
				label: "Contato",
				location: "contato",
				icon: 'email',
				iconSeparator: 'chevron_right',
			}
		]; 

		scope.titulo = "Home"; 

		scope.menu = [
			{
				icon: 'menu',
				abrirMenu: "Abrir menu",
			}
		];

		scope.toggleSidenav = function(menu) {
			mdSidenav(menu).toggle();
		}

		scope.gotoSelection = function (routeToGo) {
			mdSidenav('left').toggle();
			location.url(routeToGo);
		};

		scope.logout = function () {
			loginService.logout();
			setTimeout(function(){
				scope.user = {};
			}, 50);
		};

		scope.openMenu = function($mdOpenMenu, ev) {
			$mdOpenMenu(ev);
		};


		getUsuarioLogado();

	}]);

})(window.angular);