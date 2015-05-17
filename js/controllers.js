angular.module('starter.controllers', ['angularAwesomeSlider'])

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

    .controller('ProfileController', function($scope) {
        $scope.achievements = [
            {
                'credits' : 10,
                'name' : 'First try !',
                'desc' : 'Envoyez votre premier feedback'
            },
            {
                'credits' : 15,
                'name' : 'Patient',
                'desc' : 'Patientez plus de 30\' dans une file (#FoutLaRage)'
            },
            {
                'credits' : 30,
                'name' : 'Arpenteur',
                'desc' : 'Envoyez plus de 30 feedbacks'
            },
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

        var today = new Date();
        var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        var dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        $scope.actualMonth = monthNames[today.getMonth()];

        $scope.days=[];

        var selected = today.getDate();
        for(var i=0;i<7;++i){
            $scope.days[i]= {
                "name": dayNames[today.getDay()],
                "number": today.getDate()
            }
            today.setDate(today.getDate()+1);
        }

        $scope.onDaySelectClick = function(id){
            console.log(id);
            $("#daySelect" + selected).removeClass("active");
            selected = id;
            $("#daySelect" + id).addClass("active")
        }

        var ctx = document.getElementById("myChart").getContext("2d");

        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(255,226,161,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0.4)');

        var data = {
            labels: ["07h", "08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: gradient ,
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [15, 20, 10, 18, 25, 60, 50, 70, 40, 28]
                }]};

        var myLineChart = new Chart(ctx).Line(data, null);

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

            console.log($(".circular-day"));

            var cart_icon = {
                    iconUrl: 'img/cart.png',
                    iconSize:     [38, 38], // size of the icon
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    shadowAnchor: [4, 62],  // the same for the shadow
                    popupAnchor:  [0,0] // point from which the popup should open relative to the iconAnchor
            };

            var mainMarker = {
                lat: $scope.commerce.latitude,
                lng: $scope.commerce.longitude,
                focus: true,
                draggable: false
            };

            $scope.map = {
                defaults: {
                    tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                    maxZoom: 22,
                    zoomControlPosition: 'bottomleft'
                },
                markers: {
                    mainMarker : angular.copy(mainMarker)
                },
                events: {
                    map: {
                        enable: ['context'],
                        logic: 'emit'
                    }
                }
            };

            $scope.map.center = {
                lat: $scope.commerce.latitude-0.0004,
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

    .controller('RateController', function($scope, $stateParams, $filter, $timeout) {
        $scope.item = {
            'id' : 1,
            'icon' : '',
            'name' : 'Four des remparts',
            'queue' : 5,
            'category' : 'Boulangerie',
            'place' : 'Compiègne'
        };

        $scope.show = false;
        $timeout(function() {
            $scope.show  = true;
        }, 1000);
        $scope.id = "bob";
        $scope.value = "5";
        $scope.valueVisibility = "40;70";
        $scope.disa = true;
        $scope.disabledtoto = false;
        $scope.data = {
            quote: {
                coverages: {
                    coverageA: 200000
                }
            }
        };
        $scope.defaultAmount=190000;

        $scope.coverageASliderOptions = {
            from: $scope.defaultAmount,
            to: $scope.defaultAmount+ ($scope.defaultAmount* 0.20),
            step: 500,
            calculate: function(value) {
                return $filter('currency')(value, '$', 0);
            }
        };

        $scope.disable = function() {
            $scope.disabledtoto = !$scope.disabledtoto;
        };
        $scope.toggleVisibility = function () {
            $scope.show = !$scope.show;
        };

        var calculate = function( value ) {
            var hours = Math.floor( value / 60 );
            var mins = ( value - hours*60 );
            return (hours < 10 ? "0"+hours : hours) + ":" + ( mins == 0 ? "00" : mins );
        };

        var modelLabelsFn = function(value) {
            return value;
        }

        $scope.options = {
            from: 0,
            to: 60,
            step: 1,
            round: 1,
            dimension: " min",
            vertical: false,
            scale: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
            // round: 2,
            skin: 'plastic',
            limits: false,
            modelLabels: modelLabelsFn,
            //realtime: true,
            /*css: {
             background: {'background-color': 'yellow'},
             before: {'background-color': 'purple'},
             default: {'background-color': 'white'},
             after: {'background-color': 'green'},
             pointer: {'background-color': 'red'}
             },*/
            callback: function(value, released) {
                console.log(value + " " + released);
            }
        };

        $scope.optionsVisibility = {
            from: 10,
            to: 100,
            step: 1,
            dimension: ' min',
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.optionsCss = {
            from: 1,
            to: 100,
            step: 1,
            dimension: " km",
            vertical: false,
            css: {
                background: {'background-color': 'yellow'},
                before: {'background-color': 'purple'},
                default: {'background-color': 'white'},
                after: {'background-color': 'green'},
                pointer: {'background-color': 'red'}
            },
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.optionsV = {
            from: 0,
            to: 40,
            step: 0.5,
            dimension: " $",
            round: 1,
            skin: 'jslider_blue',
            scale: [0, '|', 10, '|', 20, '|' , 30, '|', 40],
            vertical: true,
            /*css: {
             background: {"background-color": "yellow"},
             before: {"background-color": "purple"},
             default: {"background-color": "blue"},
             after: {"background-color": "green"},
             pointer: {"background-color": "red"}
             },*/
            callback: function(value, elt) {
                console.log(value);
                console.log(elt);
            }
            // calculate: calculate
        };

        $scope.options2 = {
            from: 0,
            to: 100,
            floor: true,
            step: 10,
            dimension: " km",
            css: {
                background: {"background-color": "yellow"},
                before: {"background-color": "purple"},
                default: {"background-color": "white"},
                after: {"background-color": "green"},
                pointer: {"background-color": "red"}
            },
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.options2V = {
            from: 1,
            to: 100,
            floor: true,
            step: 10,
            dimension: " km",
            vertical: true,
            skin: 'round',
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.options2VCSS = {
            from: 1,
            to: 100,
            floor: true,
            step: 10,
            dimension: " km",
            vertical: true,
            css: {
                background: {"background-color": "yellow"},
                before: {"background-color": "purple"},
                default: {"background-color": "blue"},
                after: {"background-color": "green"},
                pointer: {"background-color": "red"}
            },
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.options3 = {
            from: 700,
            to: 2100,
            step: 1,
            smooth: false,
            dimension: " mb",
            callback: function(value, elt) {
                console.log(value);
            }
        };

        $scope.changeOptions = function() {

            $scope.options = {
                from: 0,
                to: 80,
                step: 1,
                dimension: " $",
                scale: [0, '|', 10, '|', 20, '|' , 30, '|', 40, '|', 50, '|', 60, '|', 70, '|', 80]
            };

        };

        $scope.changeValue = function() {

            $scope.value = "11;15";
            $scope.value2 = "13;15";
            $scope.value3 = 20;
            $scope.value4 = "700;1000";

        };

        $scope.changeValueAndProperty = function() {
            $scope.options = {
                from: 1,
                to: 60,
                step: 1,
                dimension: ""
            };
            //$scope.value3 = "10;50";
        };
    })
