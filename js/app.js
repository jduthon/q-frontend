// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

            // HOME STATES AND NESTED VIEWS ========================================
            .state('app', {
                url: '/app',
                templateUrl: 'templates/index.html'
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('rate', {
                url: '/app/rate',
                templateUrl: 'templates/rate.html',
                controller: 'RateController'
            });

    });
