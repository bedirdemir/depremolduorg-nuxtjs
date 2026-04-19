<template>
  <section class="py-3 px-2 min-h-screen lg:px-0">
    <ItemDetail v-if="earthquakeStore.isModalActive"></ItemDetail>
    <LoadingSvg v-if="earthquakeStore.loading"></LoadingSvg>
    <div v-else>
      <div class="flex mb-3 text-center w-full shadow-sm">
        <div class="px-2 py-1 bg-yellow-300 text-xs rounded-l w-1/4">Küçük</div>
        <div class="px-2 py-1 bg-red-500 text-xs text-white w-1/4">Orta</div>
        <div class="px-2 py-1 bg-red-900 text-xs text-white w-1/4">Büyük</div>
        <div class="px-2 py-1 bg-zinc-800 text-xs text-white rounded-r w-1/4">Çok Büyük</div>
      </div>
      <ul class="-mx-2 border-y border-stone-200 bg-white lg:mx-0">
        <ListItem v-for="(earthquake, i) in paginatedEarthquakes" :key="i" :data="earthquake"></ListItem>
      </ul>
      <div v-if="totalItems > 0" class="mt-5 flex flex-col items-center gap-3 text-center lg:flex-row lg:justify-between lg:text-left">
        <p class="text-xs text-stone-600">
          {{ startItemIndex }}-{{ endItemIndex }} / {{ totalItems }} deprem
        </p>
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            class="px-3 py-1.5 rounded-lg border border-secondary bg-secondary text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none"
            :disabled="isFirstPage"
            @click="previousPage"
          >
            Önceki
          </button>
          <button
            v-for="pageNumber in pages"
            :key="pageNumber"
            class="px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all"
            :class="pageNumber === currentPage ? 'border-primary bg-primary text-white shadow-sm' : 'border-stone-300 bg-white text-stone-700 hover:border-primary/60 hover:text-primary'"
            @click="goToPage(pageNumber)"
          >
            {{ pageNumber }}
          </button>
          <button
            class="px-3 py-1.5 rounded-lg border border-secondary bg-secondary text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:border-stone-300 disabled:bg-stone-100 disabled:text-stone-400 disabled:shadow-none"
            :disabled="isLastPage"
            @click="nextPage"
          >
            Sonraki
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
const earthquakeStore = useEarthquakeStore();
const route = useRoute();
const pageSize = 50;
const currentPage = ref(1);

const totalItems = computed(() => earthquakeStore.earthquakeList.length);
const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / pageSize)));
const pages = computed(() => Array.from({ length: totalPages.value }, (_, index) => index + 1));
const paginatedEarthquakes = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return earthquakeStore.earthquakeList.slice(start, start + pageSize);
});
const isFirstPage = computed(() => currentPage.value === 1);
const isLastPage = computed(() => currentPage.value === totalPages.value);
const startItemIndex = computed(() => (totalItems.value ? (currentPage.value - 1) * pageSize + 1 : 0));
const endItemIndex = computed(() => Math.min(currentPage.value * pageSize, totalItems.value));

const goToPage = page => {
  const normalizedPage = Math.min(totalPages.value, Math.max(1, page));
  currentPage.value = normalizedPage;
};

const nextPage = () => {
  goToPage(currentPage.value + 1);
};

const previousPage = () => {
  goToPage(currentPage.value - 1);
};

watch(totalPages, newTotalPages => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages;
  }
});

watch(
  () => route.path,
  path => {
    currentPage.value = 1;
    earthquakeStore.getData(path);
  },
  { immediate: true }
);

useHead({
  title: "Son Depremler ve Deprem Haritası - Deprem Oldu",
  meta: [
    {
      name: "description",
      content: "Türkiye'de gerçekleşen son depremler. Türkiye deprem haritası. Deprem ve Afet Bilinci Hakkında Bilmeniz Gerekenler. DepremOldu.org - Deprem Oldu"
    }
  ]
});
</script>
