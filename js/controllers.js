

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

        console.log($("#menuMap").height());
        console.log($("#blurred"));
        $("#blurred").height($("#menuMap").height());
        $("#blurred").height(24);
        console.log($("#blurred").height());

        /**
         * Once state loaded, get put map on scope.
         */
        $scope.$on("$stateChangeSuccess", function() {
            console.log("TAMER");
            $scope.commerce = {
                'name': 'MachinTruc',
                'longitude': 2.815848,
                'latitude': 49.412262,
                'ville' : "Compiégne",
                'adresse' : "49 Rue Notre Dame de Bon Secours",
                'type' : "Supermarché",
                'attente' : 10,
                'distance' : "6.5Km"
            };

            $scope.map = {
                defaults: {
                    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    maxZoom: 22,
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
                zoom: 18
            };



            /*

            var svg = SVG('menuMap').size($("body").width(),(20*$(document).height())/100);
            svg.attr({fill : "white", 'fill-opacity': "0.5"});
            var menuMap = $("#menuMap");
            var yPointSVG = 10;
            svg.text($scope.commerce.adresse + ",").attr({y : yPointSVG, x: 5,fill : "black"});
            svg.text($scope.commerce.ville).attr({y: parseInt(yPointSVG) + 25, x: 5, fill: "black"});
            var midPointSVG = menuMap.width()/2;
            svg.text($scope.commerce.type).attr({y:yPointSVG,x:midPointSVG,fill:"black","text-anchor":"middle","font-weight":"bold"});
            svg.text("Q " + $scope.commerce.attente + "'").attr({x:midPointSVG,y:parseInt(yPointSVG) + 25,fill:"black","text-anchor":"middle"});
            var xPointSVG = menuMap.width() - 10;
            svg.text($scope.commerce.distance).attr({x:xPointSVG,y:yPointSVG,fill:"black","text-anchor":"end"});

            menuMap.css("z-index","10");*/
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