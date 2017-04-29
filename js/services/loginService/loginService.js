angular.module("app.services").service("LoginService", 
    ['$cookies', 'HttpService', 'toastAlert',
    function (cookies, httpService, toastAlert) {

    this.auth = function (user) {
        return httpService.post('/auth', user).then( function (response) {            
            return response;            
        }, function (error) {
            toastAlert.defaultToaster('Ops, verifique seu usuário e senha.');
        });
    }

    this.refresh = function () {
        return httpService.get('/auth/refresh').then(function (result) {
            saveTokenAux(result.data.token);
        });
    }

    this.logout = function () {
        cookies.remove('X-Auth-Token');        
        this.userLogged();
    }

    this.saveToken = function (token) {
        saveTokenAux(token);
    }

    this.getToken = function () {
        cookies.get('X-Auth-Token');
    }

    this.userLogged = function () {
        return httpService.get('/user/logged');
    }

    var saveTokenAux = function (token) {
        cookies.put('X-Auth-Token', token);
    }

}]);
