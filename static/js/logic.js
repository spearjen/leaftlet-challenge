// Create the tile layer that will be the background of our map
var eqMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    id: "satellite-streets-v9",
    accessToken: api_key
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    gtSevFiveShallow: new L.LayerGroup(),
    gtSevFiveMedium: new L.LayerGroup(),
    gtSevFiveDeep: new L.LayerGroup(),
    btFiveSevFiveShallow: new L.LayerGroup(),
    btFiveSevFiveMedium: new L.LayerGroup(),
    btFiveSevFiveDeep: new L.LayerGroup(),
    btTwoFiveFourNineShallow: new L.LayerGroup(),
    btTwoFiveFourNineMedium: new L.LayerGroup(),
    btTwoFiveFourNineDeep: new L.LayerGroup(),
    ltTwoFiveShallow: new L.LayerGroup(),
    ltTwoFiveMedium: new L.LayerGroup(),
    ltTwoFiveDeep: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("mapid", {
    center: [30, 0],
    zoom: 2.5,
    layers: [
        layers.gtSevFiveShallow,
        layers.gtSevFiveMedium,
        layers.gtSevFiveDeep,
        layers.btFiveSevFiveShallow,
        layers.btFiveSevFiveMedium,
        layers.btFiveSevFiveDeep,
        layers.btTwoFiveFourNineShallow,
        layers.btTwoFiveFourNineMedium,
        layers.btTwoFiveFourNineDeep,
        layers.ltTwoFiveShallow,
        layers.ltTwoFiveMedium,
        layers.ltTwoFiveDeep
  ]
});

// Add 'eqmap' tile layer to the map
eqMap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
    "Magnitude > 7.5 & shallow": layers.gtSevFiveShallow,
    "Magnitude > 7.5 & medium depth": layers.gtSevFiveMedium,
    "Magnitude > 7.5 & deep": layers.gtSevFiveDeep,
    "Magnitude 5 - 7.5 & shallow": layers.btFiveSevFiveShallow,
    "Magnitude 5 - 7.5 & medium depth": layers.btFiveSevFiveMedium,
    "Magnitude 5 - 7.5 & deep": layers.btFiveSevFiveDeep,
    "Magnitude 2.5 - 5 & shallow": layers.btTwoFiveFourNineShallow,
    "Magnitude 2.5 - 5 & medium depth": layers.btTwoFiveFourNineMedium,
    "Magnitude 2.5 - 5 & deep": layers.btTwoFiveFourNineDeep,
    "Magnitude < 2.5 & shallow depth": layers.ltTwoFiveShallow,
    "Magnitude < 2.5 & medium depth": layers.ltTwoFiveMedium,
    "Magnitude < 2.5 & deep depth": layers.ltTwoFiveDeep
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// // Initialize an object containing icons for each layer group

var icons = {
    gtSevFiveShallow: L.ExtraMarkers.icon({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle",
        height:80,
        width:200
        // markerSize: [80, 200]
    }),
    gtSevFiveMedium: L.ExtraMarkers.icon({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle",
        height: 80,
        width: 200
    }),
    gtSevFiveDeep: L.ExtraMarkers.icon({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "red",
        shape: "circle",
        height: 80,
        width: 200
    }),
    btFiveSevFiveShallow: L.ExtraMarkers.icon({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle",
        height: 60,
        width: 150
    }),
    btFiveSevFiveMedium: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle",
        height: 60,
        width: 150
    }),
    btFiveSevFiveDeep: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "red",
        shape: "circle",
        height: 60,
        width: 150
    }),

    btTwoFiveFourNineShallow: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle",
        height: 40,
        width: 100
    }),
    btTwoFiveFourNineMedium: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle",
        height: 40,
        width: 100
    }),
    btTwoFiveFourNineDeep: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "red",
        height: 40,
        width: 100
    }),
    ltTwoFiveShallow: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "yellow",
        shape: "circle",
        height: 20,
        width: 50
    }),
    ltTwoFiveMedium: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "orange",
        shape: "circle",
        height: 20,
        width: 50
    }),
    ltTwoFiveDeep: L.ExtraMarkers.icon ({
        icon: "ion-pulse-outline",
        iconColor: "white",
        markerColor: "red",
        shape: "circle",
        height: 20,
        width: 50
        // markerSize: [20,50]
    }),
};

// Perform an API call to the USGS endpoint
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(infoMag) {

    // var earthquakeGeo = infoMag.features;
    //     console.log(earthquakeGeo);
    var earthquakeMag= infoMag.features;
        console.log(earthquakeMag);
    

    // Create an object to keep of the number of markers in each layer
    var earthquakeCount = {
        gtSevFiveShallow: 0,
        gtSevFiveMedium: 0,
        gtSevFiveDeep: 0,
        btFiveSevFiveShallow: 0,
        btFiveSevFiveMedium: 0,
        btFiveSevFiveDeep: 0,
        btTwoFiveFourNineShallow: 0,
        btTwoFiveFourNineMedium: 0,
        btTwoFiveFourNineDeep: 0,
        ltTwoFiveShallow: 0,
        ltTwoFiveMedium: 0,
        ltTwoFiveDeep: 0
    };


    // Initialize a earthquakeCoding, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var earthquakeCoding;

    // Loop through the earthquake properties
    for (var i = 0; i < earthquakeMag.length; i++) {

        // Create a new earthquake object with properties of both station objects
        var earthquake = Object.assign({}, earthquakeMag[i], earthquakeMag[i]);

        // If an earthquake is deep depth and high magnitude
        if ((earthquake.properties.mag >7.5) && (earthquake.geometry.coordinates[2] > 10)) {
        earthquakeCoding = "gtSevFiveDeep";
        }
        // If an earthquake is medium depth and high magnitude
        else if ((earthquake.properties.mag >7.5) && (earthquake.geometry.coordinates[2] >5 && earthquake.geometry.coordinates[2] <= 10)) {
        earthquakeCoding = "gtSevFiveMedium";
        }
        // If an earthquake is shallow depth and high magnitude
        else if ((earthquake.properties.mag >7.5) && (earthquake.geometry.coordinates[2] <= 5)) {
        earthquakeCoding = "gtSevFiveMediumShallow";
        }

        // If an earthquake is deep depth and medium high magnitude
        else if ((earthquake.properties.mag >5 && earthquake.properties.mag <= 7.5) && (earthquake.geometry.coordinates[2] > 10)) {
        earthquakeCoding = "btFiveSevFiveDeep";
        }
        // If an earthquake is medium depth and medium high magnitude
        else if ((earthquake.properties.mag >5 && earthquake.properties.mag <= 7.5) && (earthquake.geometry.coordinates[2] >5 && earthquake.geometry.coordinates[2] <= 10)) {
        earthquakeCoding = "btFiveSevFiveMedium";
        }
        // If an earthquake is shallow depth and medium high magnitude
        else if ((earthquake.properties.mag >5 && earthquake.properties.mag <= 7.5) && (earthquake.geometry.coordinates[2] <= 5)) {
        earthquakeCoding = "btFiveSevFiveShallow";
        }


        // If an earthquake is deep depth and medium low magnitude
        else if ((earthquake.properties.mag >2.5 && earthquake.properties.mag <= 5) && (earthquake.geometry.coordinates[2] > 10)) {
        earthquakeCoding = "btTwoFiveFourNineDeep";
        }
        // If an earthquake is medium depth and medium low magnitude
        else if ((earthquake.properties.mag >2.5 && earthquake.properties.mag <= 5) && (earthquake.geometry.coordinates[2] >5 && earthquake.geometry.coordinates[2] <= 10)) {
        earthquakeCoding = "btTwoFiveFourNineMedium";
        }
        // If an earthquake is shallow depth and medium low magnitude
        else if ((earthquake.properties.mag >2.5 && earthquake.properties.mag <= 5) && (earthquake.geometry.coordinates[2] <= 5)) {
        earthquakeCoding = "btTwoFiveFourNineShallow";
        }

        // If an earthquake is deep depth and low magnitude
        else if ((earthquake.properties.mag <= 2.5) && (earthquake.geometry.coordinates[2] > 10)) {
        earthquakeCoding = "ltTwoFiveDeep";
        }
        // If an earthquake is medium depth and low magnitude
        else if ((earthquake.properties.mag <= 2.5) && (earthquake.geometry.coordinates[2] >5 && earthquake.geometry.coordinates[2] <= 10)) {
        earthquakeCoding = "ltTwoFiveMedium";
        }
        // If an earthquake is shallow depth and low magnitude
        else {
        earthquakeCoding = "ltTwoFiveShallow";
        }

      // Update the earthquake count
      earthquakeCount[earthquakeCoding]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]], {
        icon: icons[earthquakeCoding]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[earthquakeCoding]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup("Magnitude: " + earthquake.properties.mag + "<br> Latitude: " + earthquake.geometry.coordinates[0] + "<br> Longitude: " + earthquake.geometry.coordinates[1] + " <br> Depth: " + earthquake.geometry.coordinates[2]);
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(earthquakeCount);
  });
// });

// // Update the legend's innerHTML with the earthquake count
function updateLegend(earthquakeCount) {
  document.querySelector(".legend").innerHTML = [
    // "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
    "<p class='depthDeep'>Number of quakes > 7.5 magnitude & Deep: " + earthquakeCount.gtSevFiveDeep+ "</p>",
    "<p class='depthMedium'>Number of quakes > 7.5 magnitude & Medium Depth: " + earthquakeCount.gtSevFiveMedium+ "</p>",
    "<p class='depthShallow'>Number of quakes > 7.5 magnitude & Shallow: " + earthquakeCount.gtSevFiveShallow + "</p>",
    "<p class='depthDeep'>Number of quakes 5 - 7.5 magnitude & Deep: " + earthquakeCount.btFiveSevFiveDeep + "</p>",
    "<p class='depthMedium'>Number of quakes 5 - 7.5 magnitude & Medium Depth: " + earthquakeCount.btFiveSevFiveMedium + "</p>",
    "<p class='depthShallow'>Number of quakes 5 - 7.5 magnitude & Shallow: " + earthquakeCount.btFiveSevFiveShallow + "</p>",
    "<p class='depthDeep'>Number of quakes 2.5 - 5 magnitude & Deep: " + earthquakeCount.btTwoFiveFourNineDeep + "</p>",
    "<p class='depthMedium'>Number of quakes 2.5 - 5 magnitude & Medium Depth: " + earthquakeCount.btTwoFiveFourNineMedium + "</p>",
    "<p class='depthShallow'>Number of quakes 2.5 - 5 magnitude & Shallow: " + earthquakeCount.btTwoFiveFourNineShallow + "</p>",
    "<p class='depthDeep>Number of quakes < 2.5 magnitude & Deep: " + earthquakeCount.ltTwoFiveDeep + "</p>",
    "<p class='depthMedium'>Number of quakes < 2.5 magnitude & Medium Depth: " + earthquakeCount.ltTwoFiveMedium + "</p>",
    "<p class='depthShallow'>Number of quakes < 2.5 magnitude & Shallow: " + earthquakeCount.ltTwoFiveShallow + "</p>"
  ].join("");
}
