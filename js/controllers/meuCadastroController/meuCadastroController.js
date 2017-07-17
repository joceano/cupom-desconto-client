/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: MeuCadastroController, controller da tela de manutenção de cadastro.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('MeuCadastroController', 
        ['$scope','HttpService', 'toastAlert', 'LoginService',
	    function(scope, httpService, toastAlert, loginService) { 

        scope.senha = '';
        scope.novaSenha = '';

        /**
         * Faz requisição para a API para retornar o usuário logado.
         **/
        var getUsuarioLogado = function() {
            loginService.userLogged().then(function (result) {
                scope.usuario = result.data;
            });
        };

        /**
         * Envia requisição para a API para salvar o cadastro.
         **/
        scope.save = function(usuario, password) {            
            httpService.post('/user/'+password, usuario).then(function(res) {
                usuario.id = res.data.id;
                scope.senha = '';
        		scope.novaSenha = '';
                toastAlert.defaultToaster('O cadastro foi alterado com sucesso.');
            }, function (error) { 
               toastAlert.defaultToaster('Ops, não foi possível alterar o cadastro.');
            });
        }

        getUsuarioLogado();

	}]);
})(window.angular);