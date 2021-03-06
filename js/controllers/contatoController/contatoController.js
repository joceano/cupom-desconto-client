/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: ContatoController, controller da tela de contato.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('ContatoController', ['$scope', 'toastr',
	 function(scope, toastr) {
	 	
	 	scope.nome     = '';
	 	scope.email    = '';
	 	scope.telefone = '';
	 	scope.mensagem = '';

	 	/**
         * Simula o envio de um email. Não será implementado neste momento.
         **/ 
	 	scope.enviar = function() {            
            toastr.success('E-mail enviado com sucesso.');
        }	

	}]);
})(window.angular);