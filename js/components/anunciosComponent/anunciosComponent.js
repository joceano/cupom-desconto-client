/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Component: anuncio, componente para listagem e manutenção de anúncios.
 * data: 15/07/2017
 **/
(function(angular) {
	'use strict';
	
	angular.module('app.components').component('anuncio', {
	  templateUrl: 'partials/components/anuncio.html',
	  controller: 'AnuncioController'
	});
})(window.angular);
