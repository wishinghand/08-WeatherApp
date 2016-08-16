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

        vm.weatherInfo;
        vm.searchHistory = [];
        //return data object
        vm.searchItem = {};
        vm.loaded = false;

        vm.submitCity = submitCity;

        // function gets called without 2nd argument sometimes to render it falsy, see if() statement inside
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

                // falsy argument from function call means this won't happen, stopping certain API requests from being added to history
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