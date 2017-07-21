/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: HomeController, controller da tela principal "Home".
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('HomeController',
		['$scope', 'HttpService', 'LoginService', '$mdDialog', 'toastr', '$location', 'modalService',
		function(scope, httpService, loginService, mdDialog, toastr, location, modalService) {
		
		scope.cupom = {"id" : null, "usuario" : {"id" : null}, "anuncio" : {"id" : null}, "data" : null};

		/**
         * Faz requisição para a API para retornar os anúncios.
         **/
		var getAnuncios = function() {
			scope.loading = true;
			httpService.get('/home/').then(function(res) {                
				scope.anuncios = res.data;
				scope.loading = false;
			}, function (error) {
				toastr.error('Não foi possível carregar os anúncios.');
			});
		};

		/**
         * Abre o modal para confirmação de aquisição do cupom.
         **/
		scope.showConfirm = function(ev, anuncio, cupom, user) {
		var confirm = mdDialog.confirm()
			.title('Deseja utilizar esse cupom de desconto?')			
			.ariaLabel('')
			.targetEvent(ev)
			.ok('Confirmar')
			.cancel('Cancelar');

			mdDialog.show(confirm).then(function() {
				if (user.id) {
					cupom.anuncio = anuncio;
					cupom.usuario = user;
			  		httpService.post('/cupom/pegarcupom/', cupom).then(function(res) {
			  			toastr.info(res.data);
		            }, function (error) {
		            	toastr.error('Não foi possível adquirir o cupom.');
		            });	
				}
				else {
					location.path('/login');
					toastr.warning('Faça seu login ou cadastre-se.');
				}
			}, function() {
		  		//Cancelou
			});
	  	};

	  	/**
         * Abre o modal VerMais com maiores detalhes do anúncio.
         **/
	  	scope.verMaisDialog = function(ev, anuncio) {            
            modalService.openDialog(
                'partials/dialog/vermaisDialog.html', 'VerMaisDialogController',
                callBack, ev, anuncio
            );
        }

        /**
         * Função callBack executada ao fechar o modal verMais. Deverá ser implementado se necessário.
         **/
        var callBack = function() {};

		getAnuncios();

	}]);
})(window.angular);