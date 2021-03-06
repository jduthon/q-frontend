angular.module('starter.controllers', ['angularAwesomeSlider'])

    .controller('AppController', function($scope) {



    })

    .controller('SearchController', function($scope, $http) {

        $http.get('data/data.json')
            .success(function(data) {
                $scope.items = data;
            })
            .error(function() {
                console.log('could not find someFile.json');
            });
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
                'desc' : 'Patientez plus de 30min dans une file'
            },
            {
                'credits' : 30,
                'name' : 'Arpenteur',
                'desc' : 'Envoyez plus de 30 feedbacks'
            },
        ];
    })

    .controller('mapViewController', function($scope, $http, $stateParams){


        angular.extend($scope, {
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.mapHeight = $(document).height() - $("#navbar-map").height() - 10;

        var today = new Date();
        var monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
        ];
        var dayNames = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        $scope.actualMonth = monthNames[today.getMonth()];

        $scope.days=[];

        daysData = [
            [15, 20, 10, 18, 25, 60, 50, 70, 40, 28],
            [10, 5, 10, 22, 38, 80, 50, 70, 25, 10],
            [4, 5, 4, 15, 27, 60, 60, 55, 10, 7],
            [20, 23, 14, 10, 60, 70, 59, 64, 35, 28],
            [8, 5, 4, 8, 45, 55, 50, 60, 55, 34],
            [12, 5, 9, 18, 55, 80, 70, 67, 54, 35],
            [10, 5, 10, 22, 38, 80, 50, 70, 25, 10]
        ]

        var selected = today.getDate();
        for(var i=0;i<7;++i){
            $scope.days[i]= {
                "name": dayNames[today.getDay()],
                "number": today.getDate(),
                "data": daysData[i]
            }
            today.setDate(today.getDate()+1);
        }

        $scope.onDaySelectClick = function(id){
            console.log(id);
            $("#daySelect" + selected).removeClass("active");
            selected = id;
            $("#daySelect" + id).addClass("active")
        }

        /**
         * Once state loaded, get put map on scope.
         */
        $scope.readyState = false;
        $scope.readyJson = false;
        $scope.$on("$stateChangeSuccess", function() {
            $scope.readyState = true;
            $scope.loadMyMap();
            console.log("Coucou");
            $scope.loadChart();
        });
        $scope.loadMyMap = function() {

            if(!$scope.readyState || !$scope.readyJson)
                return;

            console.log("TAMER");
            /*$scope.commerce = {
                'name': 'MachinTruc',
                'longitude': 2.815848,
                'latitude': 49.412262,
                'ville' : "Compiégne",
                'adresse' : "49 Rue Notre Dame de Bon Secours",
                'type' : "Supermarché",
                'attente' : 10,
                'distance' : "6.5Km"
            };*/


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
        }

        $scope.loadChart = function(){
            var myChart = $("#myChart");
            myChart.height($scope.graphHeight);
            myChart.width($scope.graphWidth);

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
                        data: $scope.days[0].data
                    }]};

            var myLineChart = new Chart(ctx).Line(data, null);
            console.log("Chart load");

        }

        $http.get('data/data.json')
            .success(function(data) {
                for(var it in data){
                    if(data[it].idPlace == parseInt($stateParams.idPlace)){
                        $scope.commerce = data[it];
                        console.log("$scope.commerce");
                        console.log($scope.commerce);
                        $scope.readyJson = true;
                        $scope.loadMyMap();
                        break;
                    }
                }
            })
            .error(function() {
                console.log('could not find someFile.json');
            });

    })

    .controller('RateController', function($scope, $stateParams, $http, $filter, $timeout) {

        $http.get('data/data.json')
            .success(function(data) {
                for(var it in data){
                    if(data[it].idPlace == $stateParams.idPlace){
                        delete data[it].distancePlace;
                        $scope.item = data[it];
                    }
                }
            })
            .error(function() {
                console.log('could not find someFile.json');
            });



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
