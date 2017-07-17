/**
 * @autor -  Joceano Alves de Borba - <alves.joceano@gmail.com>
 * Service: modalService, service padrão para os modais.
 * data: 15/07/2017
 **/
(function (angular) {
	'use strict';
    var DialogService = (function () {
        
        function DialogService($mdDialog) {
            this.$mdDialog = $mdDialog;
        }

        DialogService.prototype.openDialog = function (templateUrl, controller, callBack, ev, parameter) {
            var self = this;
            self.$mdDialog.show({
                templateUrl: templateUrl,
                controller:  controller,
                controllerAs: 'ctrl',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals:  parameter,
                clickOutsideToClose: true,
                fullscreen: true,
                multiple: true
            }).then(function(response) {
                callBack(response);
            }, function() {
                
            });
        }

        DialogService.$inject = [
            '$mdDialog'
        ];

        return DialogService;
        
    }());

    angular.module('app.services').service('modalService', DialogService);
})(window.angular);