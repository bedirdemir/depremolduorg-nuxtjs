<template>
  <section class="min-h-[70%]">
    <LoadingSvg v-if="earthquakeStore.loading"></LoadingSvg>
    <EarthquakeMap v-else></EarthquakeMap>
  </section>
</template>
<script>
export default {
  data(){
    return {
      earthquakeStore: useEarthquakeStore()
    }
  },
  created(){
    this.earthquakeStore.setCurrentRoute(this.$route.path);
    this.earthquakeStore.getData();
  }
}
</script>