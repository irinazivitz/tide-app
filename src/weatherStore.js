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
            heightUnit: 'm',
            loading: false,
            error: null,
            isMobile: window.innerWidth <= 768,
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
                if (!tideResponse.data || !tideResponse.data.extremes || tideResponse.data.extremes.length === 0){
                    throw new Error (
                        "Looks like you are too far from the water, tide data is not available for this location. Please try a zip closer to a coastal area."
                    );
                }
                
                this.tideData.extremes = tideResponse.data.extremes || [];
                this.tideData.station = tideResponse.data.station || null;
                console.log('tide data:', tideResponse.data);

                const timezoneResponse = await getTimezone(this.lat, this.lon);
                this.timezone = timezoneResponse.zoneName;
                console.log ('Timezone:', this.timezone);

                this.loading = false;
            } catch (error) {
                console.error("Full error response:", error.response);
            
                if (error.response) {
                    const status = error.response.status;
                    console.error("Error status:", status);
                    if (status === 404) {
                        this.error = "Invalid ZIP code, please try again.";
                    } else if (status === 400) {
                        this.error = "Looks like you are too far from the water, tide data is not available for this location. Please try a ZIP code closer to a coastal area.";
                    } else {
                        console.error("Unexpected error data:", error.response.data);
                        this.error = "An unexpected error occurred. Please try again later.";
                    }
                } else if (error.message) {
                    this.error = error.message;
                } else {
                    console.error("Unknown error:", error);
                    this.error = "An unexpected error occurred. Please try again later.";
                }
            
                this.loading = false;
            }
        },

        checkIfMobile() {
            this.isMobile = window.innerWidth <=768;
        }
    }
});