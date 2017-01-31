(function(angular) {
	'use strict';
	angular.module('app.routes', ['ngRoute', 'ngMaterial'])

	.config(function ($mdDateLocaleProvider, $mdThemingProvider, $mdAriaProvider) {
		// $mdThemingProvider.theme('default').primaryPalette('red');
		$mdThemingProvider.theme('default').primaryPalette('teal');		
		
	})
	.config(['$routeProvider', function (routeProvider) {
		routeProvider.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		}).when('/contato', {
			templateUrl: 'partials/contato.html',
			controller: 'ContatoController'
		}).when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		}).otherwise({
			redirectTo: '/home'
		});
	}]);
})(window.angular);