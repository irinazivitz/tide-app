import {defineStore} from 'pinia';
import service from './services/WeatherTest.js';
import tideservice from './services/TideService.js';
import { getTimezone } from './services/TimezoneService.js';


export const useWeatherStore = defineStore('weather', {
    state:() => ({
            zipcode: "",
            lat: null,
            lon: null,
            name:"",
            temp:"",
            country:"",
            timezone: "",
            tideData: {
                station: null,
                extremes: [],
            },
            weatherData: {},
            weatherIcon: "", 
            tempUnit: 'F',
            loading: false,
            error: null,
    }),
    actions: {
        async setZipcode (zipcode) {
            this.zipcode = zipcode;
            this.loading = true;
            this.error = null;

            try{
                const response = await service.getLatLon(zipcode);
                if ( !response || !response.data || !response.data.lat || !response.data.lon){
                    throw new Error("Invalid zipcode, please try again");
                }  
                console.log('latlon response:', response.data);
                this.lat = response.data.lat;
                this.lon = response.data.lon;
                this.name = response.data.name;
                this.country = response.data.country;

                const weatherResponse = await service.getWeather(this.lat, this.lon, true); // getting weather data 
                this.weatherData = weatherResponse.data;
                console.log('weather data:', weatherResponse.data);

                const tideResponse = await tideservice.getTideData(this.lat, this.lon); //getting tide data
                this.tideData.extremes = tideResponse.data.extremes || [];
                this.tideData.station = tideResponse.data.station || null;
                console.log('tide data:', tideResponse.data);

                const timezoneResponse = await getTimezone(this.lat, this.lon);
                this.timezone = timezoneResponse.zoneName;
                console.log ('Timezone:', this.timezone);

                this.loading = false;
            } catch (error){
                if(error.response && error.response.status === 404){
                    this.error = "Invalid zipcode, please try again";
                } else {
                    console.error("Error fetching data:", error);
                this.error = error.message;
                }
                this.loading = false;
            }
        },
    },
});