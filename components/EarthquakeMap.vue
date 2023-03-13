<template>
  <div id="mapContainer" class="min-h-[75vh]"></div>
</template>
<script>
export default {
  data(){
    return {
      map: null,
      earthquakeStore: useEarthquakeStore()
    }
  },
  mounted(){
    this.map = L.map("mapContainer").setView([39.1300, 35.2110], 5);
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    function onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.popupContent) {
          layer.bindPopup(feature.properties.popupContent);
      }
    };
    L.geoJSON(this.earthquakeStore.geojsonFeature, {
      onEachFeature,
      style: (feature) => {
			  return feature.properties && feature.properties.style;
      },
      pointToLayer: (feature, latlng) => {
      return L.circleMarker(latlng, {
        color: "#000",
        weight: 3,
        opacity: 0.8,
        fillOpacity: 1
      });
      }
    }).addTo(this.map);
    L.Control.textbox = L.Control.extend({
      onAdd: function(map) {
        var text = L.DomUtil.create('div', "");
        text.id = "info_text";
        text.innerHTML = `
          <div class='flex flex-col shadow-sm text-[.65rem]'>
          <div class='bg-primary p-1 text-white text-center rounded-t'>SON 500 DEPREM</div>
          <div class="flex items-end items-center py-1 px-2 space-x-2 bg-white rounded-b">
          <div class='flex gap-1 items-center'>
            <div class='rounded-full p-[.25rem] bg-[#fde047] border-2 border-black'></div>
            Küçük
          </div>
          <div class='flex gap-1 items-center'>
            <div class='rounded-full p-[.35rem] bg-[#ef4444] border-2 border-black'></div>
            Orta
          </div>
          <div class='flex gap-1 items-center'>
            <div class='rounded-full p-[.45rem] bg-[#7f1d1d] border-2 border-black'></div>
            Büyük
          </div>
          <div class='flex gap-1 items-center'>
            <div class='rounded-full p-[.55rem] bg-[#27272a] border-2 border-black'></div>
            Çok Büyük
          </div>
          </div>
          </div>
        `
        return text;
      }
      });
      L.control.textbox = function(opts) { return new L.Control.textbox(opts);}
      L.control.textbox({ position: 'topright' }).addTo(this.map);
  }
}
</script>