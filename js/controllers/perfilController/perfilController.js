(function (angular) {
	'use strict';
	angular.module('app.controllers').controller('PerfilController', ['$scope', '$location', 'modalService', 'LoginService',
	 function(scope, location, modalService, loginService) {

        const _Anuncio   = 1;
        const _Categoria = 2;        
        const _Administrador = 'ROLE_ADMIN';

	 	scope.selectedIndex = 0;
        scope.userAdmin = '';
        scope.user = '';	 		 

	 	scope.setSelectedIndex = function(index) {            
           scope.selectedIndex = index;           
        }

        var getUsuarioLogado = function() {
            loginService.userLogged().then(function (result) {
                scope.user = result.data.roles;
                if (result.data.roles == _Administrador) {
                    scope.userAdmin = result.data.roles;   
                } else {
                    scope.userAdmin = null;
                }
            });
        };         

    	scope.openDialog = function(ev, index) {            
            scope.index = index;
            if (scope.index == _Categoria) {
            	modalService.openDialog('partials/components/dialog/categoriaDialog.html', 
            		'CategoriaDialogController', callBack, ev, null);
            } else if (scope.index == _Anuncio) {                
                modalService.openDialog('partials/components/dialog/anuncioDialog.html', 
                    'AnuncioDialogController', callBack, ev, null);
            }
    	}

    	var callBack = function(obj) {           
            if (scope.index == _Categoria) {
                scope.$broadcast('pushCategoria', obj);
            } else if (scope.index == _Anuncio) {
                scope.$broadcast('pushAnuncio', obj);
            }
            
        };

        getUsuarioLogado();    
	
	}]);

})(window.angular);