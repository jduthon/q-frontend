// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'leaflet-directive'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/app');

        $stateProvider

            .state('app', {
                url: '/app',
                templateUrl: 'templates/index.html'
            })

            .state('rate', {
                url: '/app/rate/:idPlace',
                templateUrl: 'templates/rate.html',
                controller: 'RateController'
            })

            .state('search', {
                url: '/app/search',
                templateUrl: 'templates/search.html',
                controller: 'SearchController'
            })

            .state('mapView', {
                url: '/app/mapView',
                templateUrl: 'templates/mapView.html',
                controller: 'mapViewController'
            })

            .state('profile', {
                url: '/app/profile',
                templateUrl: 'templates/profile.html',
                controller: 'ProfileController'
            });

    })


.directive('sliderRangeFilter', [function() {
    return {
        restrict: 'A',
        template: '<div id="searchBySliderFilter" class="filter-slider"><input ng-model="value"  type="text" id="mySlider1" slider options="options" /></div>',
        link: function($scope, element, attrs) {
        }

    };
}]);

/*
.directive("clockPicker", function(){
    return {
        restrict: "A",
        link: function(scope,element,attrs) {
// Initialize the clockpicker with options.

            console.log("here man");
            $(element).clockpicker({
                placement: 'top',
                donetext: 'Done'
            });
            $(function () {
                var clock = $('.clockpicker');


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
        }
    }
});
*/