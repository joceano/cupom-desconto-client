(function (angular) {
	'use strict';
	angular.module('app.controllers').controller('PerfilController', ['$scope', '$location', 'modalService',
	 function(scope, location, modalService) {

	 	scope.selectedIndex = 0;	 		 

	 	scope.setSelectedIndex = function(index) {            
           scope.selectedIndex = index;           
        }

    	scope.openDialog = function(ev, index) {	            
            if (index == 2) {
            	modalService.openDialog('partials/components/dialog/categoriaDialog.html', 
            		'CategoriaDialogController', callBack, ev, null);
            }
    	}

    	var callBack = function(categoria) {
            scope.$broadcast('pushCategoria', categoria);
        };       
	
	}]);

})(window.angular);