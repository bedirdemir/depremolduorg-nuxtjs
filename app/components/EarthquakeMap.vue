<template>
  <div id="mapContainer" class="min-h-[75vh]"></div>
</template>
<script setup>
const earthquakeStore = useEarthquakeStore();

onMounted(() => {
  const faultColorsByConfidence = {
    A: "#b91c1c",
    B: "#ef4444",
    C: "#f87171",
    D: "#fca5a5"
  };
  const baseFaultWeightByRate = {
    1: 4,
    2: 3,
    3: 2
  };
  const faultLayers = new Set();

  function extractFaultMeta(layer) {
    const description = layer?.feature?.properties?.description;
    if (typeof description !== "string") {
      return null;
    }

    const confidenceMatch = description.match(/CONF=\s*<b>\s*([ABCD])\s*<\/b>/i);
    const rateMatch = description.match(/RATE=\s*<b>\s*([123])\s*<\/b>/i);
    if (!confidenceMatch && !rateMatch) {
      return null;
    }

    const confidence = confidenceMatch?.[1]?.toUpperCase();
    const rate = Number(rateMatch?.[1]);

    return {
      confidence: ["A", "B", "C", "D"].includes(confidence) ? confidence : "C",
      rate: [1, 2, 3].includes(rate) ? rate : 3
    };
  }

  function getDynamicFaultWeight(rate, zoom) {
    const baseWeight = baseFaultWeightByRate[rate] || 2;
    const zoomFactor = Math.min(1.25, Math.max(0.58, 0.58 + (zoom - 5) * 0.09));

    return Number((baseWeight * zoomFactor).toFixed(2));
  }

  function getFaultStyle(meta, zoom) {
    return {
      color: faultColorsByConfidence[meta.confidence] || faultColorsByConfidence.C,
      weight: getDynamicFaultWeight(meta.rate, zoom),
      opacity: 0.9
    };
  }

  function styleFaultLayer(layer, zoom) {
    if (typeof layer?.setStyle !== "function") {
      return;
    }

    const meta = layer.__faultMeta || extractFaultMeta(layer);
    if (!meta) {
      return;
    }

    layer.__faultMeta = meta;
    layer.setStyle(getFaultStyle(meta, zoom));
    faultLayers.add(layer);
  }

  function collectAndStyleFaultLayers(layer, zoom) {
    styleFaultLayer(layer, zoom);

    if (typeof layer?.eachLayer === "function") {
      layer.eachLayer(childLayer => {
        collectAndStyleFaultLayers(childLayer, zoom);
      });
    }
  }

  function restyleFaultLayersByZoom(map) {
    const zoom = map.getZoom();

    faultLayers.forEach(layer => {
      if (!layer?._map) {
        return;
      }
      styleFaultLayer(layer, zoom);
    });
  }

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
  let kmz = L.kmzLayer();
  kmz.on("load", () => {
    collectAndStyleFaultLayers(kmz, map.getZoom());
  });

  map.on("layeradd", event => {
    collectAndStyleFaultLayers(event.layer, map.getZoom());
  });

  map.on("zoomend", () => {
    restyleFaultLayersByZoom(map);
  });

  map.on("overlayadd", event => {
    if (event.layer === kmz) {
      collectAndStyleFaultLayers(kmz, map.getZoom());
    }
  });

  earthquakeStore.faultData.map(x => {
    kmz.load(x);
  });
  L.control.layers(null, null, { collapsed: false }).addTo(map).addOverlay(kmz, "Fay Hatları (GINRAS)");

  // KMZ dosyaları asenkron yüklendiği için ilk render sonrası da tekrar uygula.
  setTimeout(() => {
    collectAndStyleFaultLayers(kmz, map.getZoom());
  }, 1200);
});
</script>
