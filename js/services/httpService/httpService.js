angular.module("app.services").service("HttpService", 
    ['$http', '$cookies', '$location',
    function (http, cookies, location) {

    var contextPath = "http://localhost:8080/server";

    this.get = function (url) {
        return http({
            method: 'GET',
            url: contextPath + url,
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }            
        });
    }

    this.post = function (url, obj) {
        return http({
            method: 'POST',
            url: contextPath + url,
            data: JSON.stringify(obj),
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }
        });
    }

    this.delete = function (id) {
        return http({
            method: 'DELETE',
            url: contextPath + id,            
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }
        });
    }

}]);
