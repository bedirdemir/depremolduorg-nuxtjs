<template>
  <header class="flex justify-between items-center pt-3 pb-2 lg:pt-4 px-2 lg:px-0 bg-[#FCFFE760] lg:bg-inherit">
    <div class="flex items-center space-x-1">
      <svg class="w-10 lg:w-12 text-primary" fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 47 47" xml:space="preserve">
        <g>
          <g>
            <path d="M24.104,41.577c-0.025,0-0.053-0.001-0.078-0.001c-1.093-0.035-2.025-0.802-2.271-1.867l-5.46-23.659l-3.199,8.316
                    c-0.357,0.93-1.252,1.544-2.249,1.544H2.41c-1.331,0-2.41-1.079-2.41-2.41c0-1.331,1.079-2.41,2.41-2.41h6.78l5.433-14.122
                    c0.38-0.989,1.351-1.612,2.418-1.54c1.057,0.074,1.941,0.831,2.18,1.863l5.186,22.474l4.618-15.394
                    c0.276-0.923,1.078-1.592,2.035-1.702c0.953-0.107,1.889,0.36,2.365,1.198l4.127,7.222h7.037c1.331,0,2.41,1.079,2.41,2.41
                    c0,1.331-1.079,2.41-2.41,2.41h-8.436c-0.865,0-1.666-0.463-2.094-1.214l-2.033-3.559l-5.616,18.722
                    C26.104,40.88,25.164,41.577,24.104,41.577z"/>
          </g>
        </g>
      </svg>
      <a href="https://depremoldu.org/">
        <h1 class="text-secondary text-lg lg:text-xl">depremoldu.org</h1>
      </a>
    </div>
    <div>
        <a @click="getData" class="flex items-center rounded text-xs lg:text-base bg-secondary text-white p-2 cursor-pointer active:opacity-75 transition-all" >
            <svg class="w-4 lg:w-5 mr-1" fill="currentColor" version="1.1" viewBox="0 0 32 32"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,16c-1.219,0-1.797,0.859-2,1.766C25.269,21.03,22.167,26,16,26c-5.523,0-10-4.478-10-10S10.477,6,16,6  c2.24,0,4.295,0.753,5.96,2H20c-1.104,0-2,0.896-2,2s0.896,2,2,2h6c1.104,0,2-0.896,2-2V4c0-1.104-0.896-2-2-2s-2,0.896-2,2v0.518  C21.733,2.932,18.977,2,16,2C8.268,2,2,8.268,2,16s6.268,14,14,14c9.979,0,14-9.5,14-11.875C30,16.672,28.938,16,28,16z"/></svg>
            Yenile
        </a>
    </div>
  </header>
</template>
<script>
export default {
  data(){
    return {
      getData: useEarthquakeStore().getData
    }
  }
}
</script>