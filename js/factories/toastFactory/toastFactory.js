(function () {
    'use strict';

    angular.module('app.factories').factory('toastAlert', toastAlert);

    toastAlert.$inject = ['$mdToast'];

    function toastAlert($mdToast) {

        var service = {
            customToaster: customToaster,
            defaultToaster: defaultToaster
        };

        return service;
        
        function customToaster(content , delay, position) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(content)
                .position(position)
                .hideDelay(delay)
            );
        }

        function defaultToaster(content) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(content)
                .position('top right')
                .hideDelay(2000)
            );
        }
    }
})();