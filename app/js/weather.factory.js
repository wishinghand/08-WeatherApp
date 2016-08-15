(function() {
    'use strict';
    angular.module('weatherApp')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ["$http", "toastr"];

    function weatherFactory($http, toastr){
        var appID = '8922015c9605f6193b555a64bbaef53e';

        return{
            getWeather : getWeather
        };

       function getWeather(city){
            return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&APPID=" + appID + "&units=imperial")
            .then(weatherSuccess)
            .catch(weatherFail);
        }

        function weatherSuccess(response){
            console.log(response.data);
            return response.data;
        }

        function weatherFail(error){
            toastr.error('There was an error: ' + error.statusText + ". Please try again in a few moments.");
        }
    }

})();