/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Component: meucadastro, componente para a manutenção de dados do usuário logado.
 * data: 15/07/2017
 **/
(function(angular) {
	'use strict';
	
	angular.module('app.components').component('meucadastro', {
	  templateUrl: 'partials/components/meucadastro.html',
	  controller: 'MeuCadastroController'
	});
})(window.angular);
