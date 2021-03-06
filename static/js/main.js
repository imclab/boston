function play(videoName) {
    console.log('vid ' + videoName);
    var shadow = $('<div id="shadow" />');
    shadow.click(function(){
        $('#shadow').remove();
        $('#overlay').remove();
    });
    shadow.appendTo(document.body);
    var overlay = $('<div id="overlay"><video id="myVideo" autoplay width="640" height="360" controls /></div>');
    overlay.appendTo(document.body);
    var source = "http://www.unlock-boston.com/static/vid/" + videoName + ".webm";
    console.log(source);
    $("#myVideo").attr("src", source);
}


var map = mapbox.map('map');
// Create the map after retrieving features.json
$.getJSON("static/features.json", function(features){
    // Create map
    map.addLayer(mapbox.layer().id('gavinh.UrbanStrata'));

    // Create and add marker layer
    var markerLayer = mapbox.markers.layer().features(features);


    // Replace the markerLayer factory function
    markerLayer.factory(function(m) {
        // Create a marker using the simplestyle factory
        var elem = mapbox.markers.simplestyle_factory(m);
        
        // Custom style for the pin
        elem.className = 'marker-image';
        elem.setAttribute('src', 'static/img/orange_pin.png');

        // Add function that centers marker on click
        MM.addEvent(elem, 'click', function(e) {
            map.ease.location({
                lat: m.geometry.coordinates[1],
                lon: m.geometry.coordinates[0]
            }).zoom(map.zoom()).optimal();

        }); 
        return elem;
    }); 

    // Add the markers layer
    var interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);

    // Set a custom formatter for tooltips
    // Provide a function that returns html to be used in tooltip
    // this is related popup and pin
    interaction.showOnHover(false);
    interaction.formatter(function(feature) {
        var o = 
        '<h2>' + feature.properties.name + '</h2>' +
        '<h3>' + feature.properties.address + '</h3>' + 
        '<img class="descriptionImg" src="' + feature.properties.image + '"/>' + 
        '<div class="descriptionText" >' + feature.properties.desc + "</div>" + 
        '<h4><a id="' + feature.properties.video + '" onclick="play(this.id);" href="#">Play</a></h4>';
        return o;
    });

    // Set iniital map center and zoom level
    map.centerzoom({
        lat: 42.361711128482284,
        lon: -71.06155264816285
    }, 15);
    map.setZoomRange(15,17);
    map.ui.zoomer.add();

    var onscreen = document.getElementById('onscreen');
    map.addCallback('drawn', function() {
        var markers = markerLayer.markers();

        var list = '';

        for (var i = 0; i < markers.length; i++) {
            list = list + 
//                 '<div>' + 
//                 '<img class="descriptionImgList" src="' + markers[i].data.properties.image + '"/>' + 
                '<a href="#" ' +
                'onclick="map.ease.location({lat:' + 
                markers[i].data.geometry.coordinates[1] + 
                ', lon: ' + 
                markers[i].data.geometry.coordinates[0] +
                '}).zoom(map.zoom()).optimal()"' + '>' +

                '<div class="descriptionListName" >' + markers[i].data.properties.name + "</div>" +
                '</a>' + 
                '<div class="list-desc">' + markers[i].data.properties.desc + "</div>" +  
                '</div>';
        }
        $("#onscreen").html(list);


    });

});