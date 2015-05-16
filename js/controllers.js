

angular.module('starter.controllers', [])

.controller('AppController', function($scope) {



})

.controller('SearchController', function($scope) {
    $scope.items = [
        {
            'id' : 1,
            'icon' : '',
            'name' : 'Four des remparts',
            'queue' : 5,
            'category' : 'Boulangerie',
            'place' : 'Compiègne',
            'distance' : '500m'
        },
        {
            'id' : 2,
            'icon' : '',
            'name' : 'Sandwicherie',
            'queue' : 15,
            'category' : 'Boulangerie',
            'place' : 'Compiègne',
            'distance' : '1km'
        }
    ];
})

    .controller('mapViewController', function($scope){
        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });

        /**
         * Once state loaded, get put map on scope.
         */
        $scope.$on("$stateChangeSuccess", function() {
            console.log("TAMER");
            $scope.commerce = {
                'name': 'MachinTruc',
                'longitude': 2.815848,
                'latitude': 49.412262
            };

            $scope.map = {
                defaults: {
                    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    maxZoom: 18,
                    zoomControlPosition: 'bottomleft'
                },
                markers: {},
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                }
            };

            $scope.map.center = {
                lat: $scope.commerce.latitude,
                lng: $scope.commerce.longitude,
                zoom: 14
            };
        });




    })

.controller('RateController', function($scope, $idPlace) {

})
    .directive("clockPicker", function(){
        return {
            link: function(scope,element,attrs) {
// Initialize the clockpicker with options.

                var input = $('#single-input').clockpicker({
                    placement: 'bottom',
                    align: 'left',
                    autoclose: true,
                    'default': 'now'
                });

// Manually toggle to the minutes view
                $('#check-minutes').click(function(e){
                    console.log('prout');
                    // Have to stop propagation here
                    e.stopPropagation();
                    input.clockpicker('show')
                        .clockpicker('toggleView', 'minutes');
                });
            }
        }
    });