<template>
  <header class="flex justify-between items-center pt-3 lg:border-t-[2.8px] border-primary lg:pt-4 px-2 lg:px-1 mb-1 lg:mb-0">
    <div class="flex items-center space-x-1">
      <svg class="w-8 lg:w-10 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
      <a href="https://www.depremoldu.org/">
        <h1 class="text-secondary text-lg font-medium lg:text-xl">depremoldu<span class="text-primary">.org</span></h1>
      </a>
    </div>
    <div>
      <a @click="getData()" class="flex items-center text-primary bg-white border border-primary/20 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-xs lg:text-sm px-3 py-1.5 lg:px-3 lg:py-2 cursor-pointer transition-all">
        <svg class="w-[.9rem] lg:w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Yenile
      </a>
    </div>
  </header>
</template>
<script setup>
const { getData } = useEarthquakeStore();
</script>
