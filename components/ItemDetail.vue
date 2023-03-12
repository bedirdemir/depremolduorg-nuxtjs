<template>
  <div class="modal" :class="{active: useEarthquakeStore().isModalActive}">
    <div class="bg-white p-3 rounded flex flex-col w-11/12 lg:w-5/12">
      <div class="flex justify-end mb-3">
        <a @click="useEarthquakeStore().modalToggle" class="flex items-center bg-primary text-white rounded cursor-pointer px-2 py-1 lg:p-2">
          <svg class="w-6 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_429_11083)">
            <path d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_429_11083">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
          Kapat
        </a>
      </div>
      <div id="mapContainer" class="h-96"></div>
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
      map: null,
      selectedItem: null
    }
  },
  mounted(){
    this.selectedItem = useEarthquakeStore().selectedItem;
    this.map = L.map("mapContainer").setView([this.selectedItem.lat, this.selectedItem.long], 8);
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);
    L.marker([this.selectedItem.lat, this.selectedItem.long]).addTo(this.map)
    .bindPopup(`${this.selectedItem.region}<br><b>${this.selectedItem.magnitude} ${this.selectedItem.scale}</b>`)
    .openPopup();
  }
}
</script>