(function (angular) {
    'use strict';

    angular.module('app.controllers').controller('AnuncioDialogController', 
        ['$scope','HttpService','$mdDialog', 'locals', 'toastAlert',
        function(scope, httpService, mdDialog, locals, toastAlert) {            
        
        const _Sim = 'SIM';
        const _Nao = 'NAO';    

        if(locals) {
            locals.dataInicial = new Date(locals.dataInicial);
            locals.dataFinal = new Date(locals.dataFinal);            
            scope.anuncio = locals;
            tratarAnuncioParaTela(locals);
        } else {
             scope.anuncio = {};
        }
        
        function tratarAnuncioParaTela(anuncio) {
            tratarAprovadoParaTela(anuncio.aprovado);
            tratarAtivoParaTela(anuncio.ativo);                        
        }

        function tratarAtivoParaTela(ativo) {
            scope.ativo = false;
            if (ativo == _Sim) {
                scope.ativo = true;
            }
        }

        function tratarAprovadoParaTela(aprovado) {
            scope.aprovado = false;
            if (aprovado == _Sim) {
                scope.aprovado = true;
            }
        } 

        scope.cancel = function() {
            mdDialog.cancel();
        }

        var tratarAtivoParaGravar = function(ativo) {            
            if (ativo) {
                return _Sim;
            } else {
                return _Nao;
            }
        };

        var tratarAprovadoParaGravar = function(aprovado) {            
            if (aprovado) {
                return _Sim;
            } else {
                return _Nao;
            }
        };

        scope.save = function(anuncio, ativo, aprovado) {
            scope.loading = true;  
            anuncio.ativo = tratarAtivoParaGravar(ativo);
            anuncio.aprovado = tratarAprovadoParaGravar(aprovado);
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
    }]);
})(window.angular);