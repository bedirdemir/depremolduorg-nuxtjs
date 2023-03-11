import { defineStore } from "pinia";

export const useEarthquakeStore = defineStore('EarthquakeStore', {
  state: () => ({
    earthquakeList: [],
    earthquakeMap: [],
    loading: false,
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
    getData(){
			this.loading = true;

			if(this.currentRoute == "/"){
				AppAxios.get("/last/200")
				.then(res => {
					this.earthquakeList = res.data;
					this.loading = false;
				})
				.catch(function (error) {
					console.log(error);
				});
			};

			if(this.currentRoute == "/map"){
				AppAxios.get("/last/500")
				.then(res => {
					this.geojsonFeature.features = [];
					for(let i = 0; i < res.data.length; i++){
						const content = `
							<b>${res.data[i].region}</b>
							<br>
							<b>Tarih: </b>${res.data[i].date} - ${res.data[i].time}
							<br>
							<b>Büyüklük: </b>${res.data[i].magnitude} ${res.data[i].scale}
							<br>
							<b>Derinlik: </b>${res.data[i].depth} km
							<br>
							<b>Koordinat: </b>${res.data[i].lat}, ${res.data[i].long}
							`;
						const style = () => {
							let magnitude = Number(res.data[i].magnitude);
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
									Number(res.data[i].long),
									Number(res.data[i].lat)
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