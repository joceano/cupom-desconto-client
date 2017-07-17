/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: MainController, controller principal do sistema.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';
	angular.module('app.controllers').controller('MainController', 
		['$scope', '$mdSidenav','$location','LoginService',
	 	function(scope, mdSidenav, location, loginService) {
		
		scope.titulo = "cupons.com"; 

		scope.menu = [
			{icon: 'menu', abrirMenu: "Abrir menu"}
		];

		scope.$on('usuarioLogado', function(){
			getUsuarioLogado();			
		})		

		/**
         * Faz requisição para a API para retornar o usuário logado.
         **/
		var getUsuarioLogado = function() {
			loginService.userLogged().then(function (result) {				
				scope.user = result.data;
			});
		};

		/**
         * Abre o menu lateral esquerdo.
         **/
		scope.toggleSidenav = function(menu) {
			mdSidenav(menu).toggle();
		}

		/**
         * Direciona para a página conforme o menu selecionado.
         **/
		scope.gotoSelection = function (routeToGo) {
			mdSidenav('left').toggle();
			location.url(routeToGo);
		}

		/**
         * Faz logout do sistema.
         **/
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