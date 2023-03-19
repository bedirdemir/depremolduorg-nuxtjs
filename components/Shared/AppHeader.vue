<template>
  <header class="flex justify-between items-center pt-3 lg:border-t-[3px] border-primary lg:pt-4 px-2 lg:px-1 mb-1 lg:mb-0">
    <div class="flex items-center space-x-1">
      <svg class="w-8 lg:w-12 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
      <a href="https://www.depremoldu.org/">
        <h1 class="text-secondary text-base font-medium lg:text-xl">depremoldu<span class="text-primary">.org</span></h1>
      </a>
    </div>
    <div>
      <a @click="getData()" class="flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-2 py-1.5 lg:px-3 lg:py-2 cursor-pointer transition-all">
        <svg class="w-4 mr-1" fill="currentColor" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M28,16c-1.219,0-1.797,0.859-2,1.766C25.269,21.03,22.167,26,16,26c-5.523,0-10-4.478-10-10S10.477,6,16,6  c2.24,0,4.295,0.753,5.96,2H20c-1.104,0-2,0.896-2,2s0.896,2,2,2h6c1.104,0,2-0.896,2-2V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v0.518  C21.733,2.932,18.977,2,16,2C8.268,2,2,8.268,2,16s6.268,14,14,14c9.979,0,14-9.5,14-11.875C30,16.672,28.938,16,28,16z" />
        </svg>
        Yenile
      </a>
    </div>
  </header>
</template>
<script setup>
const { getData } = useEarthquakeStore();
</script>
