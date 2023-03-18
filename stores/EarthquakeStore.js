import { defineStore } from "pinia";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/tr';

dayjs.extend(relativeTime);
dayjs.locale('tr');

export const useEarthquakeStore = defineStore('EarthquakeStore', {
  state: () => ({
    earthquakeList: [],
    loading: null,
    isModalActive: false,
    selectedItem: null,
    geojsonFeature: {
      "type": "FeatureCollection",
      "features": []
    },
    currentRoute: null
  }),
  actions: {
    setCurrentRoute(route){
      this.currentRoute = route;
    },
    modalToggle(item){
			this.isModalActive = !this.isModalActive;
			this.selectedItem = item;
		},
    getRelativeTime(date, time){
      return dayjs(`${date} ${time}`, "YYYY.MM.DD hh:mm:ss").fromNow();
    },
    getData(){
			this.loading = true;

			if(this.currentRoute == "/"){
        useFetch('https://api.depremoldu.org/last/200')
				.then(res => {
					this.earthquakeList = res.data.value;
					this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			};

			if(this.currentRoute == "/map"){
        useFetch('https://api.depremoldu.org/last/500')
				.then(res => {
					this.geojsonFeature.features = [];
					for(let i = 0; i < res.data.value.length; i++){
						const content = `
              <div class='flex flex-col'>
                <b class='border-b mb-1 pb-1'>${res.data.value[i].region}</b>
                <span>
                  <i>${this.getRelativeTime(res.data.value[i].date, res.data.value[i].time)}</i>
                </span>
                <span>
                  <b>Büyüklük: </b>${res.data.value[i].magnitude} ${res.data.value[i].scale}
                </span>
                <span>
                  <b>Derinlik: </b>${res.data.value[i].depth} km
                </span>
                <span>
                  <b>Tarih: </b>${res.data.value[i].date} - ${res.data.value[i].time}
                </span>
                <span>
                  <b>Koordinat: </b>${res.data.value[i].lat}, ${res.data.value[i].long}
                </span>
              </div>
							`;
						const style = () => {
							let magnitude = Number(res.data.value[i].magnitude);
							if (magnitude >= 6.5){
								return {
									fillColor:"#27272a",
									radius: 11
								}
							}else if (magnitude >= 5.0 && magnitude < 6.5){
								return {
									fillColor:"#7f1d1d",
									radius: 9
								}
							}else if (magnitude >= 4.0 && magnitude < 5.0){
								return {
									fillColor:"#ef4444",
									radius: 7
								}
							}else{
								return {
									fillColor:"#fde047",
									radius: 5
								}
							}
						};
						const data = {
							"geometry": {
								"type": "Point",
								"coordinates": [
									Number(res.data.value[i].long),
									Number(res.data.value[i].lat)
								]
							},
							"type": "Feature",
							"properties": {
								"popupContent": content,
								"style": style()
							},
							"id": i
						};
						this.geojsonFeature.features.push(data);
					};
					this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			};
			
		}
  }
})