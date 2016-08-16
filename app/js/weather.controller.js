(function() {
    'use strict';

    angular.module('weatherApp')
        .controller('weatherController', weatherController);

    weatherController.$inject = ['weatherFactory'];

    function weatherController(weatherFactory){
        /* jshint validthis: true */
        var vm = this;
        vm.cityName = '';
        vm.loaded = false;

        //return data object
        vm.weatherInfo;
        vm.searchHistory = [];
        vm.searchItem = {};
        vm.loaded = false;

        vm.submitCity = submitCity;

        function submitCity(cityName, addToHistory) {
            vm.loading = true;
            weatherFactory.getWeather(cityName, addToHistory)
            .then(function(data){
                if(data.cod === '404'){
                    addToHistory = false;
                }
                vm.weatherInfo = data;
                vm.cityName = '';
                vm.loaded = true;
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