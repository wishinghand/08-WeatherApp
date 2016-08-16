(function() {
    'use strict';

    angular.module('weatherApp')
        .controller('weatherController', weatherController);

    weatherController.$inject = ['weatherFactory'];

    function weatherController(weatherFactory){
        /* jshint validthis: true */
        var vm = this;
        //return data object
        vm.weatherInfo = {};
        vm.cityName = '';
        vm.searchHistory = [];
        vm.searchItem = {};

        vm.submitCity = submitCity;

        function submitCity(cityName, addToHistory) {
            weatherFactory.getWeather(cityName)
            .then(function(data){
                vm.weatherInfo = data;
                vm.cityName = '';
                if(addToHistory) {
                    addToSearchHistory(cityName);
                }
            });
        }

        function addToSearchHistory(cityName) {
            vm.searchItem.cityName = cityName;
            vm.searchItem.timeStamp = Date.now();
            vm.searchHistory.push(angular.copy(vm.searchItem));
        }
    }
})();