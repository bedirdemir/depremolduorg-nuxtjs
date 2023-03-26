<template>
  <div id="mapContainer" class="min-h-[75vh]"></div>
</template>
<script setup>
import { faultData } from "../stores/faultData/faultData.js";
const earthquakeStore = useEarthquakeStore();

onMounted(() => {
  const map = L.map("mapContainer", {
    preferCanvas: true // recommended when loading large layers.
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

        <div class='bg-white shadow-sm rounded mt-1 py-1 flex items-center justify-end'>
          <span class="mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fay Hatları</span>
          <label class="relative mr-3 inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer">
            <div class="w-11 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        `;
      return text;
    }
  });

  L.control.textbox = function (opts) {
    return new L.Control.textbox(opts);
  };
  L.control.textbox({ position: "topright" }).addTo(map);

  L.geoJSON(faultData, {
    onEachFeature,
    style: feature => {
      return {
        color: "#EB455F",
        weight: 1.1,
        opacity: 0.7
      };
    }
  }).addTo(map);

  // var kmz = L.kmzLayer().addTo(map);
  // for (let i = 0; i < earthquakeStore.faultKMZList.length; i++) {
  //   kmz.load(earthquakeStore.faultKMZList[i]);
  // }
  // L.control.layers(null, null, { collapsed:false }).addTo(map);
});
</script>
