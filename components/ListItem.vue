<template>
  <li class="mb-2 shadow bg-[#FCFFE760]">
    <div class="flex justify-between p-3 border rounded w-full">
      <div class="flex items-center gap-5 lg:gap-6 w-full">
        <span :class="getDangerColor(data.magnitude)" class="flex flex-col justify-center items-center border rounded p-5 font-semibold text-xl lg:p-6 lg:text-2xl">
            {{ data.magnitude }}
          <span class=" text-xs font-normal">
            {{ data.scale }}
          </span>
        </span>
        <div class="flex flex-col w-full">
            <h2 class="text-sm lg:text-base font-semibold mb-1">{{ data.region }}</h2>
            <div class="flex flex-col text-sm lg:text-base">
              <div class="flex items-center">
                <svg class="w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span class="font-medium ml-1">{{ earthquakeStore.getRelativeTime(data.date, data.time) }}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <time class="ml-1 text-stone-700">{{data.date}} - {{ data.time }}</time>
              </div>
                <div class="flex items-center">
                <svg class="w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                <span class="ml-1 text-stone-700">{{ data.depth }} km</span>
              </div>
              <div class="flex items-center">     
                <svg class="w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <a @click="earthquakeStore.modalToggle(data)" class="text-stone-700 underline cursor-pointer ml-1">
                    Konumu görüntüle
                </a>
              </div>
            </div>
        </div>
      </div>
    </div>
  </li>
</template>
<script setup>
const earthquakeStore = useEarthquakeStore();
const props = defineProps({
  data: Object
});

const getDangerColor = (magnitude) => {
  magnitude = Number(magnitude);
  if (magnitude >= 6.5){
    return {'bg-zinc-800': true, 'text-white': true}
  }else if (magnitude >= 5.0 && magnitude < 6.5){
    return {'bg-red-900': true, 'text-white': true}
  }else if (magnitude >= 4.0 && magnitude < 5.0){
    return {'bg-red-500': true, 'text-white': true}
  }else{
    return {'bg-yellow-300': true}
  }
}

</script>