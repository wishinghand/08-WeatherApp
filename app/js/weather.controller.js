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

        function submitCity(){
            weatherFactory.getWeather(vm.cityName)
            .then(function(data){
                vm.weatherInfo = data;
                vm.searchItem.cityName = vm.cityName;
                vm.searchItem.timeStamp = Date.now();
                vm.searchHistory.push(angular.copy(vm.searchItem));
                vm.cityName = '';
            });
        }
    }
})();