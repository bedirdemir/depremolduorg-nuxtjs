<template>
  <div id="mapContainer" class="min-h-[75vh]"></div>
</template>
<script setup>
import { faultData } from "../stores/faultData/faultData.js";
const earthquakeStore = useEarthquakeStore();

onMounted(() => {
  const map = L.map("mapContainer", {
    preferCanvas: true
  }).setView([39.13, 35.211], 5);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 16,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
  }

  // Earthquakes layer
  L.geoJSON(earthquakeStore.geojsonFeature, {
    onEachFeature,
    style: feature => {
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
  }).addTo(map);

  // Info text
  L.Control.textbox = L.Control.extend({
    onAdd: function (map) {
      var text = L.DomUtil.create("div", "");
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
        `;
      return text;
    }
  });

  L.control.textbox = function (opts) {
    return new L.Control.textbox(opts);
  };
  L.control.textbox({ position: "topright" }).addTo(map);

  // Fault data layer
  let faultLayer = L.geoJSON(faultData, {
    onEachFeature,
    style: {
      color: "#EB455F",
      weight: 1.1,
      opacity: 0.7
    }
  });

  L.control.layers(null, null, { collapsed: false }).addTo(map).addOverlay(faultLayer, "Fay Hatları");
});
</script>
