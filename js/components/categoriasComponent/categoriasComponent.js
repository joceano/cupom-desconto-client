/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Component: categoria, componente para listagem e manutenção de categorias.
 * data: 15/07/2017
 **/
(function(angular) {
	'use strict';
	
	angular.module('app.components').component('categoria', {
	  templateUrl: 'partials/components/categoria.html',
	  controller: 'CategoriaController'
	});
})(window.angular);
