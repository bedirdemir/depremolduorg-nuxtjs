<template>
  <li class="mb-2 shadow bg-[#FCFFE760]">
    <div class="flex justify-between p-3 border rounded w-full">
      <div class="flex items-center gap-5 w-full">
        <span :class="getDangerColor(data.magnitude)" class="flex flex-col items-center border rounded px-4 py-3 font-semibold text-lg lg:py-2 lg:px-3">
            {{ data.magnitude }}
          <span class=" text-xs font-normal">
            {{ data.scale }}
          </span>
        </span>
        <div class="flex flex-col w-full">
          <div>
            <h2 class="text-sm lg:text-base font-semibold mb-1">{{ data.region }}</h2>
              <div class="flex flex-col text-sm lg:text-base">
                <div class="flex items-center">
                  <svg class="w-4 inline-block text-gray-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M477 936q-149 0-253-105.5T120 575h60q0 125 86 213t211 88q127 0 215-89t88-216q0-124-89-209.5T477 276q-68 0-127.5 31T246 389h105v60H142V241h60v106q52-61 123.5-96T477 216q75 0 141 28t115.5 76.5Q783 369 811.5 434T840 574q0 75-28.5 141t-78 115Q684 879 618 907.5T477 936Zm128-197L451 587V373h60v189l137 134-43 43Z"/></svg>
                  <span class="font-medium ml-1">{{ getRelativeTime(data.date, data.time) }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 inline-block text-gray-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M180 976q-24 0-42-18t-18-42V296q0-24 18-42t42-18h65v-60h65v60h340v-60h65v60h65q24 0 42 18t18 42v620q0 24-18 42t-42 18H180Zm0-60h600V486H180v430Zm0-490h600V296H180v130Zm0 0V296v130Zm300 230q-17 0-28.5-11.5T440 616q0-17 11.5-28.5T480 576q17 0 28.5 11.5T520 616q0 17-11.5 28.5T480 656Zm-160 0q-17 0-28.5-11.5T280 616q0-17 11.5-28.5T320 576q17 0 28.5 11.5T360 616q0 17-11.5 28.5T320 656Zm320 0q-17 0-28.5-11.5T600 616q0-17 11.5-28.5T640 576q17 0 28.5 11.5T680 616q0 17-11.5 28.5T640 656ZM480 816q-17 0-28.5-11.5T440 776q0-17 11.5-28.5T480 736q17 0 28.5 11.5T520 776q0 17-11.5 28.5T480 816Zm-160 0q-17 0-28.5-11.5T280 776q0-17 11.5-28.5T320 736q17 0 28.5 11.5T360 776q0 17-11.5 28.5T320 816Zm320 0q-17 0-28.5-11.5T600 776q0-17 11.5-28.5T640 736q17 0 28.5 11.5T680 776q0 17-11.5 28.5T640 816Z"/></svg>
                  <time class="ml-1 text-stone-700">{{data.date}} - {{ data.time }}</time>
                </div>
              </div>
            </div>
            <div class="flex justify-between items-center text-sm lg:text-base">
              <div class="flex items-center">     
                <svg class="w-4 inline-block text-gray-900" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d="M480 976 200 696l42-42 208 208V176h60v686l208-208 42 42-280 280Z"/></svg>
                  <span class="ml-1 text-stone-700">{{ data.depth }} km</span>
              </div>
                <a @click="earthquakeStore.modalToggle(data)"  class="underline text-sm cursor-pointer">
                    Konumu görüntüle
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-3 inline-block"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import moment from 'moment';
import 'moment/dist/locale/tr.js';
// import 'moment/locale/tr';
import { useEarthquakeStore } from '~~/stores/EarthquakeStore';
moment.locale('tr');

export default {
  props: ['data'],
  data(){
    return {
      earthquakeStore: useEarthquakeStore()
    }
  },
  methods: {
    getRelativeTime(date, time){
      return moment(`${date} ${time}`, "YYYY.MM.DD hh:mm:ss").fromNow();
    },
    getDangerColor(magnitude){
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
  }
};
</script>