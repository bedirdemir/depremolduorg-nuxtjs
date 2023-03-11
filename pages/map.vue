<template>
  <section class="min-h-[70%]">
    <EarthquakeMap v-if="useEarthquakeStore().loading"></EarthquakeMap>
    <LoadingSvg v-else></LoadingSvg>
  </section>
</template>
<script setup>
useHead({
  title: 'Türkiye Deprem Haritası- Son Depremler | DepremOldu.org',
  meta: [
    { name: 'description', content: "Türkiye'de gerçekleşen son 500 depremin harita konumu. Türkiye deprem haritası. DepremOldu.org" }
  ]
})
const route = useRoute()
useEarthquakeStore().setCurrentRoute(route.path);
useEarthquakeStore().getData();
</script>