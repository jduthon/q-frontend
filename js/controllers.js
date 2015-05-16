angular.module('starter.controllers', [])

.controller('AppController', function($scope) {



})

.controller('RateController', function($scope) {
        angular.element(document).ready(function () {

        });
        $scope.initSlider = function () {
            $(function () {
                var clock = $('.clockpicker');
                clock.clockpicker({
                    autoclose: true
                });

                console.log("here man");
                clock.clockpicker('show').clockpicker('toggleView', 'minutes');
            });
        };

        $scope.initSlider();
});