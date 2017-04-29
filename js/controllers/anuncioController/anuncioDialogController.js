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

        scope.cancel = function() {
            mdDialog.cancel();
        }

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

        scope.delete = function (anuncio) {
            httpService.delete('/anuncio/'+anuncio.id).then(function(res) {                
                anuncio.valueOf = -1;
                mdDialog.hide(anuncio);                
            }, function (error) {
                toastAlert.defaultToaster('Ops, não foi possível excluir o anuncio ' + anuncio.descricao); 
            });
        }

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