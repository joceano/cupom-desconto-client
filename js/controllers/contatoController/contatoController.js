(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('ContatoController', ['$scope', 'toastAlert',
	 function(scope, toastAlert) {
	 	
	 	scope.nome     = '';
	 	scope.email    = '';
	 	scope.telefone = '';
	 	scope.mensagem = '';

	 	scope.enviar = function() {            
            toastAlert.defaultToaster('E-mail enviado com sucesso.');
        }	

	}]);

})(window.angular);