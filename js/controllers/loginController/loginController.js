angular.module("app.controllers").controller("LoginController", ['$scope', 'LoginService',
	function (scope, loginService) {

    scope.auth = function (login) {
        loginService.auth(login).then(function (result) {
            loginService.saveToken(result.data.token);            
            location.hash = "/";            
            scope.$emit('usuarioLogado');
        });
    }

}]);
