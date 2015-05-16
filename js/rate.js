/**
 * Created by Jean on 16/05/2015.
 */

$("document").ready(function(){
    var selectedIcon="";
    var emoGroup = $(".emoticons-group");

    $( "#slider" ).slider({
        value:0,
        min: 0,
        max: 60,
        step: 10,
        slide: function( event, ui ) {
            $( "#time" ).text( ui.value + " mins" );
        }
    });
    $( "#time" ).text($( "#slider" ).slider( "value" ) + " mins" );

    $(".emoticons-group").children().each(function(){
        $(this).on("click",function(){
            $(".selected").each(function(){
                $(this).removeClass("selected");
            });
           $(this).addClass("selected");
            selectedIcon = $(this).attr("id");
            console.log("Selected icon : " + selectedIcon);
        });
    });

})