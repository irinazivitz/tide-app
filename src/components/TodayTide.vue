<template>
    <div v-if="weatherStore.loading">Loading...</div>
    <div v-else-if = "weatherStore.error"> {{weatherStore.error }} </div>
    

    <div class="container weather-tide-area" v-else>
        <div class="container" v-if="weatherStore.weatherData && weatherStore.weatherData.name && weatherStore.weatherData.sys"
                :style="{backgroundImage : backgroundImage}">

                <!-- Mobile View -->
        <div class="d-flex flex-row align-items-center justify-content-between d-md-none">
            <img :src="weatherIconUrl" alt="weather icon" class="weather-icon me-2"/>
            <div class="location-info me-2">
                <span class="fw-bold">{{ weatherStore.weatherData.name }}, {{ weatherStore.weatherData.sys.country }}</span>
            </div>
            <div class="temp-info me-2">
                    {{ convertedTemp }} °F
            </div>
            <div class="date-info">
                    {{ dayAndDate }}
            </div>
        </div>
            <!-- origina content for desktop  -->
            <div class="d-none d-md-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center ">
                    <div class="m-0 p-0">
                        <img :src="weatherIconUrl" alt="weather icon" class="me-2"/>
                    </div>
                    <div class = "d-flex flex-column m-0"> 
                        <span class="fw-bold me-3">
                            {{ weatherStore.weatherData.name}}, {{weatherStore.weatherData.sys.country}}
                        </span>
                        <div>
                            <span>
                                    {{convertedTemp}} °{{weatherStore.tempUnit}}
                            </span>
                            <span class="ms-1 me-2 text-secondary" @click="toggleTempUnit" style="cursor: pointer; margin-left: 0px;">
                                    |° {{ weatherStore.tempUnit === 'F' ? 'C' : 'F' }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class = "d-flex flex-column m-0 date-time-frame">
                    <span> {{dayAndDate}} </span>
                    <span> Local time: {{localTime}} </span>
                </div> 
            </div>
    </div>

    <hr class="wide-hr">
    

    <div v-if="weatherStore.tideData.extremes.length">
         
         <h4 class="text-center">Tide forecast for {{todayDate}}</h4>
         <table class = "table table-bordered table-striped custom-rounded-table" >
                    <thead> 
                        <tr> 
                        <th scope="col" class = "text-center fw-bold">Tide</th>
                        <th scope="col" class = "text-center fw-bold">Local Time</th>
                        <th scope="col" class = "text-center fw-bold">
                            <span  class = "text-center fw-bold">Height ({{ heightUnit}} | </span>
                            <span class="ms-1 me-1 text-center fw-bold" @click="toggleHeightUnit" style="cursor: pointer; margin-left: 0px;">
                             {{ heightUnit === 'm' ? 'ft' : 'm' }}) </span>
                        </th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        <tr v-for="(tide, index) in weatherStore.tideData.extremes" :key="index">
                            <th scope="row"> {{ tide.type}} </th>
                            <td class = "text-center">{{ convertToLocalTime(tide.date)}}</td>
                            <td class = "text-center"> {{convertHeight(tide.height).toFixed(2)}} {{ heightUnit}} </td>
                        </tr>
                    </tbody>
        </table>
      
            <p  class="text-center  fs-8 fst-italic">Your local current station is {{ weatherStore.tideData.station }}.
                Source: <a  class="link-underline-primary" href="https://www.noaa.gov"> NOAA</a>.
            </p>
    
    </div>
</div>
    
        
                    
</template>


<script>
import {useWeatherStore} from '../weatherStore';


export default {
    data () {
        return {
            today: new Date(),
            heightUnit: 'm',
        };
    },
    mounted(){
        window.addEventListener('resize', this.updateDate);
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
        backgroundImage(){
            const weather = this.weatherStore.weatherData.weather[0].main.toLowerCase();
            let background = '';

            if (weather === 'clear') {
                background = 'sunny.jpg';
            } else if (weather === 'rain'){
                background = 'rainy.jpg';
            } else if (weather === 'clouds'){
                background = 'cloudy.jpg';
            } else {
                background = 'defaultBackground.jpg';
            } return `url('/src/img/${background}')`; 
            

        },
        convertedTemp() {
            const temp = this.weatherStore.weatherData?.main?.temp;
            if (temp === undefined) return '';
            return this.weatherStore.tempUnit === 'F' ? temp : ((temp - 32) * (5/9)).toFixed(1);
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
       
    },
    methods: {
        convertToLocalTime(isoString) {
                const date = new Date (isoString);
                const timezone = this.weatherStore.timezone; //grab it from the store

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
        convertHeight (heightInFeet){
            if(this.heightUnit === 'ft'){
                return heightInFeet * 0.3048;
            }
            return heightInFeet;
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

.date-time-frame{
    background-color: rgba(255, 255, 255, 0.8); /* Light background with opacity */
    padding: 10px 15px; /* Padding for spacing inside the frame */
    border-radius: 8px;  /* Rounded corners for the frame */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Add shadow for a raised effect */
    color: #000; /* Text color (you can change this based on your design) */
    max-width: fit-content; /* Adjust the frame width to the content */
}
.wide-hr{
    width: 100vw;
    margin-left: calc(-50vw + 50%); /*NEED TO FIX WIDTH */
}

.weather-icon {
    width: 40px;
    height: 40px;
}

.location-info, .temp-info, .date-info {
    font-size: 0.9rem;
}

@media (max-width: 768px) {
    .d-flex.flex-row {
        flex-wrap: nowrap; /* Prevent wrapping */
        gap: 10px; /* Add space between items */
    }
}
</style>