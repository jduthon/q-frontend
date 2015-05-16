

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