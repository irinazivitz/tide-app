<template>
    <div> 
        <div v-if="weatherStore.loading">Loading...</div>
        <div v-else-if = "weatherStore.error"> {{weatherStore.error }} </div>
    </div>
   
    <div class="d-flex flex-row align-items-center justify-content-center container mb-2 mt-2">
        <img :src="weatherIconUrl" alt="weather icon" class="weather-icon me-2"/>
        <div class="me-3">
            <span class="fw-bold">{{ weatherStore.weatherData.name }}, {{ weatherStore.weatherData.sys?.country  || 'Loading...'}}</span>
        </div>
        <div class="me-2"> {{ convertedTemp }} °{{weatherStore.tempUnit}} </div>
        <div> {{ dayAndDate }} </div>
    </div>
        
    <div class = "tide-info-card" v-if="weatherStore.tideData.extremes.length">
         
        <h4 class="table-header-text text-center mt-2 mb-3">Tide forecast for today</h4>
        <div class="ms-3 me-3">
            <table class = "table table-bordered table-striped custom-rounded-table" >
                <thead> 
                    <tr> 
                        <th scope="col" class = "text-center fw-bold">Tide</th>
                        <th scope="col" class = "text-center fw-bold">Local Time</th>
                        <th scope="col" class = "text-center fw-bold">
                            <span  class = "text-center fw-bold">Height </span>
                        </th>
                    </tr>
                </thead>
                <tbody :key ="weatherStore.heightUnit" class="table-group-divider">
                    <tr v-for="(tide, index) in convertedTides" :key="index">
                        <th scope="row"> {{ tide.type}} </th>
                        <td class = "text-center">{{ convertToLocalTime(tide.date)}}</td>
                        <td class = "text-center"> {{ console.log('Rendering tide:', tide) }} {{tide.convertedHeight}} {{ weatherStore.heightUnit}} </td>
                    </tr>
                </tbody>
            </table>
        </div>
      
        
    
    </div>
    <p  class="text-center  fs-8 fst-italic mx-3">Your local current station is {{ weatherStore.tideData.station }}.
            Source: <a  class="link-underline-primary" href="https://www.noaa.gov"> NOAA</a>.
        </p>
</template>

<script>
import {useWeatherStore} from '../weatherStore';


export default {
    data () {
        return {
            today: new Date(),
        };
    },
    mounted(){
        window.addEventListener('resize', this.updateDate);
        console.log('Tide extremes:', this.weatherStore.tideData.extremes);
    },
    beforeUnmount(){
        window.removeEventListener('resize', this.updateDate);
    },
    computed: {
        weatherStore(){
            return useWeatherStore();
        },
        localTime(){
            const timezone = this.weatherStore.timezone;
            if (!timezone) return 'timezone not available';
            const now = new Date();
            const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit'};
            return new Intl.DateTimeFormat('en-US', options).format(now);
        },
        convertedTemp() {
            const temp = this.weatherStore.weatherData?.main?.temp;
            if (temp === undefined) return '';
            return this.weatherStore.tempUnit === 'F' ? temp.toFixed(1) : ((temp - 32) * (5/9)).toFixed(1);
        },
        weatherIconUrl(){
                if ( 
                    this.weatherStore.weatherData &&
                    this.weatherStore.weatherData.weather &&
                    this.weatherStore.weatherData.weather.length > 0
                ) {
                    const iconCode = this.weatherStore.weatherData.weather[0].icon;
                    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                }
                return ''; 
            },
        dayAndDate(){
            if (!this.today) return '';
            const isSmallScreen = window.innerWidth < 768;
            return this.today.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                ...(isSmallScreen ? {} : {weekday: 'long'})
            });
        },
        todayDate(){
            return this.today.toLocaleDateString('en-US',{
                month: 'long',
                day: 'numeric',
            });
        },
        convertedTides() {
                console.log('Recomputing convertedTides...');
            return this.weatherStore.tideData.extremes.map(tide => {
                const convertedHeight = this.weatherStore.heightUnit === 'm' ? tide.height : tide.height * 3.28084;
                    console.log(`Original: ${tide.height}, Converted: ${convertedHeight}, Unit: ${this.weatherStore.heightUnit}`);


                return {
                    ...tide,
                    convertedHeight: convertedHeight.toFixed(2),
                };
            });
        },
       
    },
    methods: {
        convertToLocalTime(isoString) {
                const date = new Date (isoString);
                const timezone = this.weatherStore.timezone || 'UTC'; //grab it from the store

                const options = {
                    timeZone: timezone,
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                };
                return new Intl.DateTimeFormat('en-US', options).format(date);
        }, 
        toggleTempUnit(){
                this.weatherStore.tempUnit = this.weatherStore.tempUnit === 'F' ? 'C' : 'F';
        },
        toggleHeightUnit(){
            this.heightUnit = this.heightUnit ==='m' ? 'ft' : 'm';
        },
        convertHeight (height){
            return this.weatherStore.heightUnit === 'm' ? height : (height * 3.28084).toFixed(2);
        },
        
        updateDate(){
            this.today = new Date();
        }
    },
    created() {
        this.weatherStore.setZipcode('90291');
    }
}


</script>

<style scoped>

.inline-block {
    display: inline-block;
    margin-left: 10px;
}

.custom-rounded-table {
    border-collapse: separate;
    border-radius: 20px;
    overflow: hidden;
}

.weather-icon {
    width: 40px;
    height: 40px;
}

@media (max-width: 768px) {
    .d-flex.flex-row {
        flex-wrap: nowrap; /* Prevent wrapping */
        gap: 10px; /* Add space between items */
    }
}
.tide-info-card {
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 
              0 -2px 10px rgba(0, 0, 0, 0.05), 
              2px 0 10px rgba(0, 0, 0, 0.05), 
             -2px 0 4px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-family: 'Roboto', sans-serif;
  transition: box-shadow 0.3s ease-in-out;
 
}
.tide-info-card:hover {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.table-header-text {
    color:#22354B;
    font-family: 'Playfair Display', serif;
    font-weight: bold;
}
.location-weather-box{
font-family: 'Roboto', sans-serif;
color:#22354B;
}
</style>