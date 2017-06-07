(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('HomeController', 
		['$scope', 'HttpService', 'LoginService', '$mdDialog', 'toastAlert', '$location',
		function(scope, httpService, loginService, mdDialog, toastAlert, location) {
		
		scope.cupom = {"id" : null, "usuario" : {"id" : null}, "anuncio" : {"id" : null}, "data" : null};

		var getAnuncios = function() {
			scope.loading = true;
			httpService.get('/home/').then(function(res) {                
				scope.anuncios = res.data; 
				scope.loading = false;                
			}, function (error) {                
				toastAlert.defaultToaster('Ops, não foi possível carregar os anúncios.');
			});
		};

		scope.showConfirm = function(ev, anuncio, cupom, user) {
		var confirm = mdDialog.confirm()
			.title('Deseja realmente utilizar esse cupom de desconto?')			
			.ariaLabel('')
			.targetEvent(ev)
			.ok('Confirmar')
			.cancel('Cancelar');

			mdDialog.show(confirm).then(function() {
				if (user.id) {
					cupom.anuncio = anuncio;
					cupom.usuario = user;
			  		httpService.post('/cupom/', cupom).then(function(res) {		  			
			  			toastAlert.defaultToaster('Parabéns, seu desconto está garantido!');
		            }, function (error) {
		            	toastAlert.defaultToaster('Ops, não foi possível adquirir esse cupom!');
		            });	
				}
				else {
					location.path('/login');
					toastAlert.defaultToaster('Ops, você não está logado!');
				}
			}, function() {
		  		//Cancelou
			});
	  	};

		getAnuncios();		
	}]);

})(window.angular);