<template>
  <section class="min-h-[75vh]">
    <LoadingSvg v-if="earthquakeStore.loading"></LoadingSvg>
    <EarthquakeMap v-else></EarthquakeMap>
  </section>
</template>
<script setup>
const earthquakeStore = useEarthquakeStore();

earthquakeStore.setCurrentRoute(useRoute().path);
earthquakeStore.getData();

useHead({
  title: 'Türkiye Deprem Haritası ve Son Depremler - Deprem Oldu',
  meta: [
    { name: 'description', content: "Türkiye'de gerçekleşen son 500 depremin harita konumu. Türkiye deprem haritası. DepremOldu.org - Deprem Oldu" }
  ]
});
</script>