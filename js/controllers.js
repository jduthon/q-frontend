angular.module('starter.controllers', [])

.controller('AppController', function($scope) {



})

.controller('RateController', function($scope) {
        angular.element(document).ready(function () {

        });
        $scope.initSlider = function () {
            $(function () {
                var clock = $('.clockpicker');

                console.log("here man");
                //clock.clockpicker('show').clockpicker('toggleView', 'minutes');
                clock.clockpicker({
                    donetext: 'Done',
                    init: function() {
                        console.log("colorpicker initiated");
                    },
                    beforeShow: function() {
                        console.log("before show");
                    },
                    afterShow: function() {
                        console.log("after show");
                    },
                    beforeHide: function() {
                        console.log("before hide");
                    },
                    afterHide: function() {
                        console.log("after hide");
                    },
                    beforeHourSelect: function() {
                        console.log("before hour selected");
                    },
                    afterHourSelect: function() {
                        console.log("after hour selected");
                    },
                    beforeDone: function() {
                        console.log("before done");
                    },
                    afterDone: function() {
                        console.log("after done");
                    }
                });

                clock.click(function(e){
                    // Have to stop propagation here
                    e.stopPropagation();
                    console.log('click');
                    clock.clockpicker('show')
                        .clockpicker('toggleView', 'minutes');
                });
            });
        };

        $scope.initSlider();
});