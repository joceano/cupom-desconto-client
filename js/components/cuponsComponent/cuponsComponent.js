/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Component: cupom, componente para listagem e manutenção de cupons.
 * data: 15/07/2017
 **/
(function(angular) {
	'use strict';
	
	angular.module('app.components').component('cupom', {
	  templateUrl: 'partials/components/cupom.html',
	  controller: 'CupomController'
	});
})(window.angular);
