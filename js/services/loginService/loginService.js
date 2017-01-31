angular.module("app.services").service("LoginService", ['$cookies', 'HttpService',
    function (cookies, httpService) {

    this.auth = function (user) {
        return httpService.post('/auth', user);
    };

    this.refresh = function () {
        return httpService.get('/auth/refresh').then(function (result) {
            saveTokenAux(result.data.token);
        });
    };

    this.logout = function () {
        cookies.remove('X-Auth-Token');
        this.userLogged();
    };

    this.saveToken = function (token) {
        saveTokenAux(token);
    };

    this.getToken = function () {
        cookies.get('X-Auth-Token');
    };

    this.userLogged = function () {
        return httpService.get('/user/logged');
    };

    var saveTokenAux = function (token) {
        cookies.put('X-Auth-Token', token);
    }

}]);
