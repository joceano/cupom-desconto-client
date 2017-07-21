/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: MeuCadastroController, controller da tela de manutenção de cadastro.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';

	angular.module('app.controllers').controller('MeuCadastroController', 
        ['$scope','HttpService', 'toastr', 'LoginService',
	    function(scope, httpService, toastr, loginService) { 

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
                toastr.success('Registro salvo com sucesso.');
            }, function (error) { 
               toastr.error('Não foi possível salvar o registro.');
            });
        }

        getUsuarioLogado();

	}]);
})(window.angular);