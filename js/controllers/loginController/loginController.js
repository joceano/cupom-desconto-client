angular.module("app.controllers").controller("LoginController", ['$scope', 'LoginService', 'modalService',
	function (scope, loginService, modalService) {

    scope.auth = function (login) {
        loginService.auth(login).then(function (result) {
            loginService.saveToken(result.data.token);            
            location.hash = "/";            
            scope.$emit('usuarioLogado');
        });
    }

    scope.openDialog = function(ev) {        
        modalService.openDialog(
            'partials/components/dialog/novoUsuarioDialog.html', 'NovoUsuarioDialogController',
            null, ev, null
        );
    }

}]);
