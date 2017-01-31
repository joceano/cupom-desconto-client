angular.module("app.services").service("HttpService", ['$http', '$cookies',
    function (http, cookies) {

    var contextPath = "http://localhost:8080/api";

    this.get = function (url) {
        return http({
            method: 'GET',
            url: contextPath + url,
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }
        });
        /*.error(function (e, status) {
            location.hash = "login";
        });*/
    };

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
        /*.error(function (e, status) {
            location.hash = "login";
        });*/
    };

}]);
