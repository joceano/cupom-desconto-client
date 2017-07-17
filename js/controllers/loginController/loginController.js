/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: LoginController, controller da tela de Login.
 * data: 15/07/2017
 **/
angular.module("app.controllers").controller("LoginController", ['$scope', 'LoginService', 'modalService',
	function (scope, loginService, modalService) {

    /**
     * Faz requisição para a API para realizar a autenticação.
     **/    
    scope.auth = function (login) {
        loginService.auth(login).then(function (result) {
            loginService.saveToken(result.data.token);            
            location.hash = "/";            
            scope.$emit('usuarioLogado');
        });
    }

    /**
     * Abre o modal para realizar um novo cadastro de usuário.
     **/
    scope.openDialog = function(ev) {        
        modalService.openDialog(
            'partials/dialog/novoUsuarioDialog.html', 'NovoUsuarioDialogController',
            null, ev, null
        );
    }

}]);
