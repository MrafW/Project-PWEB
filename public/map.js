const container = document.getElementById('popup');
//const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new ol.Overlay({
  element: container, 
});

const map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.maptiler.com/maps/streets-v2/tiles.json?key=f0xdbxBPNKd5rUjjPDEi',
        tileSize: 512,
      })
    })
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([106.84242778196752, -6.200095212824262]), //-6.200095212824262, 106.84242778196752
    zoom: 16,
  }),
  overlay: [overlay],
});
/*
const marker = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [
      new ol.Feature({
        geometry: new ol.geom.Point(
          ol.proj.fromLonLat([106.8425593507821, -6.2001657388605995])//-6.2001657388605995, 106.8425593507821
        )
      })
    ],
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png',
      anchor: [0.5, 1],
    })
  })
})
map.addLayer(marker);

map.on('click', function(evt){
    var feature = map.forEachFeatureAtPixel(evt.pixel, 
    function(feature, layer){
      //if(layer == marker){
        return feature;
      //}
    }); 
  if(feature){
    const coordinates = feature.getGeometry().getCoordinates();
    var popupContent = '<h3>Jl. Pegangsaan Timur No.56</h3>';
    popupContent += '<p>Tempat Proklamasi Kemerdekaan Indonesia pertama kali dibacakan pada 17 Agustus 1945 pukul 10.00 WIB</p>';
    content.innerHTML = popupContent;
    overlay.setPosition(coordinates);
  }
})
closer.onclick = function() {
  overlay.setPosition(undefined);
}*/
var MarkerIcon = new ol.Feature({
geometry: new ol.geom.Point(ol.proj.fromLonLat([106.8425593507821, -6.2001657388605995])),
name: 'Marker text'
})
MarkerIcon.setStyle(new ol.style.Style({
image: new ol.style.Icon({
    anchor: [0.5, 50],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://docs.maptiler.com/openlayers/default-marker/marker-icon.png'
    // ,scale: 0.4
})
}))
var MapSource = new ol.source.Vector({
features: [
    MarkerIcon
]
})
var MapLayer = new ol.layer.Vector({
source: MapSource
});
MapLayer.setZIndex(999);
map.addLayer(MapLayer);
var iconStyle = new ol.style.Style({
image: new ol.style.Icon({
    anchor: [0.5, 50],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    opacity: 0.75,
    src: 'img/marker-64.png'
}),
text: new ol.style.Text({
    font: '12px Arial',
    fill: new ol.style.Fill({ color: '#000' }),
    stroke: new ol.style.Stroke({
        color: '#fff', width: 2
    }),
    text: 'New marker text'
})
});
map.on('onclick', function(evt){
var coordinatePretty = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
var coordinate = ol.proj.toLonLat(evt.coordinate);
MapSource.clear();
var f = new ol.Feature({
    // From lon, lat
    // new ol.geom.Point(ol.proj.fromLonLat([4.35247, 50.84673])),
    // From event
    geometry: new ol.geom.Point(evt.coordinate),
    name: 'Marker text',
});
f.setStyle(iconStyle);
MapSource.addFeature(f);
SetDivLonLat(coordinate[0].toFixed(6), coordinate[1].toFixed(6));
});
var div = document.getElementById('ol-popup');
var close = document.getElementById('close');
var content = document.getElementById('content');

var popup = new ol.Overlay({
  element: div,
  autoPan: true,
  autoPanAnimation: {
      duration: 250
  }
});
popup.setPosition(undefined);
map.addOverlay(popup);
close.onclick = function() {
popup.setPosition(undefined);
close.blur();
return false;
};
map.on('singleclick', function (evt) {
// Show popup on marker click
var feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    return feature;
});

// Show popup on marker click
if (map.hasFeatureAtPixel(evt.pixel) === true)
{
    var coordinate = evt.coordinate;
    popup.setPosition(coordinate);
    // Get marker description
    var popupContent = '<h3>Jl. Pegangsaan Timur No.56</h3>';
    popupContent += '<p>Tempat Proklamasi Kemerdekaan Indonesia pertama kali dibacakan pada 17 Agustus 1945 pukul 10.00 WIB</p>';
    content.innerHTML = popupContent;
} else {
    popup.setPosition(undefined);
    close.blur();
}
console.log("Marker clicked/hovered !!!");
});