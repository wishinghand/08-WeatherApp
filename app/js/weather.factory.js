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
            return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&APPID=" + appID + "&units=imperial&type=like")
            .then(weatherSuccess)
            .catch(weatherFail);
        }

        function weatherSuccess(response){
            if(response.data.cod === '404'){
                toastr.error('There was an error in getting the weather. Please check your city name and try again.');
                return;
            }
            return response.data;
        }

        function weatherFail(error){
            toastr.error('There was an error in getting the weather. Please try again in a few moments.');
        }
    }

})();