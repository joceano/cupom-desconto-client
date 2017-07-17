/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Component: usuario, componente para listagem e manutenção de usuários.
 * data: 15/07/2017
 **/
(function(angular) {
	'use strict';
	
	angular.module('app.components').component('usuario', {
	  templateUrl: 'partials/components/usuario.html',
	  controller: 'UsuarioController'
	});
})(window.angular);
