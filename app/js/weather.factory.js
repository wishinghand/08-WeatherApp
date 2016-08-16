(function() {
    'use strict';
    angular.module('weatherApp')
        .factory('weatherFactory', weatherFactory);

    // requring HTTP and toastr modules
    weatherFactory.$inject = ["$http", "toastr", "keys"];

    function weatherFactory($http, toastr, keys){

        var service =  {
            getWeather : getWeather
        };

        return service;

        // actual API call, using imperial units and substring seraching (type=like)
       function getWeather(city){
            return $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&APPID=" + keys.weather + "&units=imperial&type=accurate")
            .then(weatherSuccess)
            .catch(weatherFail);
        }

        // all returns from this API are 200, even if city isn't found. They do have a 404 response cod as a string on the return object, so if that's parsed, we return a technical failure by showing a toast
        function weatherSuccess(response){
            if(response.data.cod === '404'){
                toastr.error('There was an error in getting the weather. Please check your city name and try again.');
                return;
            }
            return response.data;
        }

        //500 style errors will return this error message
        function weatherFail(error){
            toastr.error('There was an error in getting the weather. Please try again in a few moments.');
        }
    }

})();