function play(videoName) {
    console.log('vid ' + videoName);
    var shadow = jQuery('<div id="shadow" />');
    shadow.click(function(){
        $('#shadow').remove();
        $('#overlay').remove();
    });
    shadow.appendTo(document.body);
    // Fuck javascript. Caching and autoplay attr mess up pausing.
    var overlay = jQuery('<div id="overlay"><video id="myVideo" autoplay width="640" height="360" controls /></div>');
    overlay.appendTo(document.body);
    var source = "http://ec2-184-73-119-136.compute-1.amazonaws.com/static/vid/" + videoName + ".webm";
    console.log(source);
    $("#myVideo").attr("src", source);
}

// Create the map after retrieving features.json
$.getJSON("static/features.json", function(features){
    // Create map
    var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('gavinh.UrbanStrata'));

    // Create and add marker layer
    var markerLayer = mapbox.markers.layer().features(features);

    // Replace the markerLayer factory function
    markerLayer.factory(function(m) {
        // Create a marker using the simplestyle factory
        var elem = mapbox.markers.simplestyle_factory(m);

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
    interaction.formatter(function(feature) {
        var o = 
        '<h2>' + feature.properties.name + '</h2>' +
        '<h3>' + feature.properties.address + '</h3>' + 
        '<img class="descriptionImg" src="' + feature.properties.image + '"/>' + 
        feature.properties.desc + 
        '<p><h4><a id="' + feature.properties.video + '" onclick="play(this.id);" href="#">Play</a></h4></p>';
        return o;
    });

    // Set iniital map center and zoom level
    map.centerzoom({
        lat: 42.361711128482284,
        lon: -71.06155264816285
    }, 15);
    map.setZoomRange(15,17);
    map.ui.zoomer.add();
});