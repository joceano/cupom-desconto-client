angular.module("app.services").service("HttpService", 
    ['$http', '$cookies', '$location', 'toastAlert',
    function (http, cookies, location, toastAlert) {

    var contextPath = "http://192.168.0.103:8080/server";

    this.get = function (url) {
        return http({
            method: 'GET',
            url: contextPath + url,
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }            
        }).then(function(response){
            return response;
        
        }, function(error){
            //
        });
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
        }).then(function(response){
            return response;
        
        }, function(error){
            toastAlert.defaultToaster('Ops: ' + error.statusText);
        });
    };

    this.delete = function (id) {
        return http({
            method: 'DELETE',
            url: contextPath + id,            
            contentType: "application/json",
            headers: {
                "X-Auth-Token": cookies.get('X-Auth-Token')
            }
        }).then(function(response){
            return response;
        
        }, function(error){
            toastAlert.defaultToaster('Ops: ' + error.statusText);
        });
    };

}]);
