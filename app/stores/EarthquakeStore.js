import { defineStore } from "pinia";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";

dayjs.extend(relativeTime);
dayjs.locale("tr");

const apiURL = "https://api.orhanaydogdu.com.tr/deprem/data/search";
const QUERY_LIMIT = 100;
const LIST_COUNT = 200;
const MAP_COUNT = 500;
const CACHE_TTL_MS = 15 * 1000;
const CACHE_STORAGE_KEY = "depremoldu:earthquake-cache:v1";

let sharedFetchPromise = null;

export const useEarthquakeStore = defineStore("EarthquakeStore", {
  state: () => ({
    earthquakeList: [],
    sharedEarthquakes: [],
    cacheExpiresAt: 0,
    loading: null,
    isModalActive: false,
    selectedItem: null,
    geojsonFeature: {
      type: "FeatureCollection",
      features: []
    },
    faultData: [
      "FaultData/AFEAD_I35.kmz",
      "FaultData/AFEAD_I36.kmz",
      "FaultData/AFEAD_I37.kmz",
      "FaultData/AFEAD_J35.kmz",
      "FaultData/AFEAD_J36.kmz",
      "FaultData/AFEAD_J37.kmz",
      "FaultData/AFEAD_J38.kmz",
      "FaultData/AFEAD_K35.kmz",
      "FaultData/AFEAD_K36.kmz",
      "FaultData/AFEAD_K37.kmz",
      "FaultData/AFEAD_K38.kmz"
    ]
  }),
  actions: {
    formatDate(dateValue) {
      if (!dateValue) {
        return "-";
      }

      return dateValue.replace(/[-/]/g, ".");
    },
    normalizeEarthquake(item) {
      const coordinates = item?.geojson?.coordinates || [];
      const [long, lat] = coordinates;
      const dateTime = item?.date_time || item?.date || "";
      const [rawDate = "", rawTime = ""] = dateTime.split(" ");
      const magnitude = Number(item?.mag);
      const depth = Number(item?.depth);

      return {
        earthquake_id: item?.earthquake_id || "",
        provider: item?.provider || "kandilli",
        region: item?.title || "-",
        magnitude: Number.isFinite(magnitude) ? magnitude : 0,
        scale: "ML",
        depth: Number.isFinite(depth) ? depth : "-",
        date: this.formatDate(rawDate),
        time: rawTime || "-",
        lat: Number(lat),
        long: Number(long)
      };
    },
    async fetchEarthquakes(skip, limit) {
      const response = await $fetch(apiURL, {
        method: "POST",
        body: {
          provider: "kandilli",
          sort: "date_-1",
          skip,
          limit
        }
      });

      return Array.isArray(response?.result) ? response.result : [];
    },
    readSharedCacheFromStorage() {
      if (!process.client) {
        return null;
      }

      try {
        const cachedValue = localStorage.getItem(CACHE_STORAGE_KEY);
        if (!cachedValue) {
          return null;
        }

        const parsedValue = JSON.parse(cachedValue);
        const hasValidShape = Array.isArray(parsedValue?.data) && Number.isFinite(parsedValue?.expiresAt);
        if (!hasValidShape) {
          localStorage.removeItem(CACHE_STORAGE_KEY);
          return null;
        }

        if (parsedValue.expiresAt <= Date.now()) {
          localStorage.removeItem(CACHE_STORAGE_KEY);
          return null;
        }

        return parsedValue;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    writeSharedCacheToStorage(data, expiresAt) {
      if (!process.client) {
        return;
      }

      try {
        localStorage.setItem(
          CACHE_STORAGE_KEY,
          JSON.stringify({
            data,
            expiresAt
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    getInMemoryCache() {
      if (this.cacheExpiresAt <= Date.now()) {
        return null;
      }

      return this.sharedEarthquakes.length ? this.sharedEarthquakes : null;
    },
    setSharedCache(data) {
      const expiresAt = Date.now() + CACHE_TTL_MS;

      this.sharedEarthquakes = data;
      this.cacheExpiresAt = expiresAt;
      this.writeSharedCacheToStorage(data, expiresAt);

      return data;
    },
    async fetchAndNormalizeEarthquakes(totalCount) {
      const pageCount = Math.ceil(totalCount / QUERY_LIMIT);
      const requests = Array.from({ length: pageCount }, (_, index) => this.fetchEarthquakes(index * QUERY_LIMIT, QUERY_LIMIT));
      const pages = await Promise.all(requests);

      return pages
        .flat()
        .slice(0, totalCount)
        .map(item => this.normalizeEarthquake(item));
    },
    async getSharedEarthquakes() {
      const inMemoryCache = this.getInMemoryCache();
      if (inMemoryCache) {
        return inMemoryCache;
      }

      const storageCache = this.readSharedCacheFromStorage();
      if (storageCache) {
        this.sharedEarthquakes = storageCache.data;
        this.cacheExpiresAt = storageCache.expiresAt;
        return storageCache.data;
      }

      if (sharedFetchPromise) {
        return sharedFetchPromise;
      }

      sharedFetchPromise = this.fetchAndNormalizeEarthquakes(MAP_COUNT)
        .then(data => this.setSharedCache(data))
        .finally(() => {
          sharedFetchPromise = null;
        });

      return sharedFetchPromise;
    },
    getMagnitudeStyle(magnitude) {
      if (magnitude >= 6.5) {
        return {
          fillColor: "#27272a",
          radius: 11
        };
      } else if (magnitude >= 5.0 && magnitude < 6.5) {
        return {
          fillColor: "#7f1d1d",
          radius: 9
        };
      } else if (magnitude >= 4.0 && magnitude < 5.0) {
        return {
          fillColor: "#ef4444",
          radius: 7
        };
      } else {
        return {
          fillColor: "#fde047",
          radius: 5
        };
      }
    },
    setMapFeatures(earthquakes) {
      const mappedData = earthquakes.filter(item => Number.isFinite(item.lat) && Number.isFinite(item.long));

      this.geojsonFeature.features = mappedData.map((currentItem, index) => {
        const content = `
          <div class='flex flex-col'>
            <b class='border-b mb-1 pb-1'>${currentItem.region}</b>
            <span>
              <i>${this.getRelativeTime(currentItem.date, currentItem.time)}</i>
            </span>
            <span>
              <b>Büyüklük: </b>${currentItem.magnitude} ${currentItem.scale}
            </span>
            <span>
              <b>Derinlik: </b>${currentItem.depth} km
            </span>
            <span>
              <b>Tarih: </b>${currentItem.date} - ${currentItem.time}
            </span>
            <span>
              <b>Koordinat: </b>${currentItem.lat}, ${currentItem.long}
            </span>
          </div>
        `;

        return {
          geometry: {
            type: "Point",
            coordinates: [currentItem.long, currentItem.lat]
          },
          type: "Feature",
          properties: {
            popupContent: content,
            style: this.getMagnitudeStyle(currentItem.magnitude)
          },
          id: index
        };
      });
    },
    modalToggle(item) {
      this.isModalActive = !this.isModalActive;
      this.selectedItem = item;
    },
    getRelativeTime(date, time) {
      if (!date || !time || date === "-" || time === "-") {
        return "-";
      }

      const dateTime = `${date || ""} ${time || ""}`.trim().replace(/\./g, "/");
      const parsedDate = dayjs(dateTime, ["YYYY/MM/DD HH:mm:ss", "YYYY-MM-DD HH:mm:ss"], true);

      return parsedDate.isValid() ? parsedDate.fromNow() : "-";
    },
    async getData(currentRoute) {
      this.loading = true;

      try {
        const sharedEarthquakes = await this.getSharedEarthquakes();

        if (currentRoute == "/") {
          this.earthquakeList = sharedEarthquakes.slice(0, LIST_COUNT);
        }

        if (currentRoute == "/map") {
          this.setMapFeatures(sharedEarthquakes.slice(0, MAP_COUNT));
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
});
