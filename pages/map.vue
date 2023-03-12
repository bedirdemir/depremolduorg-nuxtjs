<template>
  <section class="min-h-[70%]">
    <LoadingSvg v-if="useEarthquakeStore().loading"></LoadingSvg>
    <EarthquakeMap v-else></EarthquakeMap>
  </section>
</template>
<script setup>
useHead({
  title: 'Türkiye Deprem Haritası ve Son Depremler - Deprem Oldu',
  meta: [
    { name: 'description', content: "Türkiye'de gerçekleşen son 500 depremin harita konumu. Türkiye deprem haritası. DepremOldu.org - Deprem Oldu" }
  ]
})
useEarthquakeStore().setCurrentRoute(useRoute().path);
useEarthquakeStore().getData();
</script>