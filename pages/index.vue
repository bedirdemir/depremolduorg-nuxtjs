<template>
  <section class="py-3 px-2 min-h-screen lg:px-0">
    <ItemDetail v-if="earthquakeStore.isModalActive"></ItemDetail>
    <LoadingSvg v-if="earthquakeStore.loading"></LoadingSvg>
    <div v-else>
        <div class="flex mb-3 text-center w-full shadow-sm">
          <div class="px-2 py-1 bg-yellow-300 text-xs  rounded-l w-1/4">Küçük</div>
          <div class="px-2 py-1 bg-red-500 text-xs text-white w-1/4">Orta</div>
          <div class="px-2 py-1 bg-red-900 text-xs text-white w-1/4">Büyük</div>
          <div class="px-2 py-1 bg-zinc-800 text-xs text-white rounded-r w-1/4">Çok Büyük</div>
        </div>
        <ul>
          <ListItem v-for="(earthquake, i) in earthquakeStore.earthquakeList" :key="i" :data="earthquake"></ListItem>
        </ul>
    </div>
  </section>
</template>
<script setup>
const earthquakeStore = useEarthquakeStore();
useHead({
  title: 'Son Depremler ve Deprem Haritası - Deprem Oldu',
  meta: [
    { name: 'description', content: "Türkiye'de gerçekleşen son depremler. Türkiye deprem haritası. Deprem ve Afet Bilinci Hakkında Bilmeniz Gerekenler. DepremOldu.org - Deprem Oldu" }
  ]
});
earthquakeStore.setCurrentRoute(useRoute().path);
earthquakeStore.getData();
</script>