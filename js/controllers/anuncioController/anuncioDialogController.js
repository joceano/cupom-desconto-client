/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Controller: AnuncioDialogController, controller do modal de manutenção de anúncios.
 * data: 15/07/2017
 **/
(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('AnuncioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert', 'LoginService',
        function(scope, httpService, mdDialog, locals, toastAlert, loginService) {                   

        if(locals) {
            locals.dataInicial = new Date(locals.dataInicial);
            locals.dataFinal = new Date(locals.dataFinal);            
            scope.anuncio = locals;
        } else {
            scope.anuncio = {};
            scope.anuncio.ativo = true;       
            scope.anuncio.aprovado = false;    
        }

        /**
         * Finaliza o modal.
         **/
        scope.cancel = function() {
            mdDialog.cancel();
        }

        /**
         * Envia requisição para a API para salvar o anúncio.
         **/
        scope.save = function(anuncio) {
            scope.loading = true;
            httpService.post('/anuncio/', anuncio).then(function(res) {
                scope.loading = false;
                anuncio.id = res.data.id;
                mdDialog.hide(anuncio);                          
            }, function (error) {
               scope.loading = false; 
               toastAlert.defaultToaster('Ops, não foi possível gravar o anúncio ' + anuncio.descricao);           
            });
        }

        /**
         * Autocomplete de categorias utilizada no cadastro de anúncio.
         * Faz requisição para a API passando a string digitada por parâmetro caso exista, 
         * ou retorna todas as categorias cadastradas se a string for vazia.
         **/
        scope.querySearch = function(query) {          
            if (query) {
                return httpService.get('/categoria/autocomplete/'+query).then(function(res){
                    return res.data;
                });
            } else {
                return httpService.get('/categoria/').then(function(res){
                    return res.data;
                });
            }
        } 

        /**
         * Faz requisição para a API para retornar o usuário logado.
         **/
        var getUsuarioLogado = function() {
            loginService.userLogged().then(function (result) {
                scope.user = result.data.roles;
                if (result.data.roles == 'ROLE_ADMIN') {
                    scope.userAdmin = result.data.roles;   
                } else {
                    scope.userAdmin = null;
                }
            });
        }; 

        getUsuarioLogado();

    }]);
})(window.angular);