<template>
    <form class="input-group mb-3" v-on:submit.prevent="getWeatherAndTide"> 
        <input type="text" class="form-control" placeholder="Enter zipcode" aria-label="zipcode" aria-describedby="button-addon2" v-model="zipcode" />
        <input class ="btn btn-primary" type="submit" value="Get tide info" />
    </form>
    <i v-if = " weatherStore.isMobile" class = "fas fa-cog" @click = "toggleUnits" ></i>
</template>

<script>
import {useWeatherStore} from '../weatherStore'; 
export default {
    setup () {
        const weatherStore = useWeatherStore();

        const toggleUnits = () => {
            
        };
        return { weatherStore, toggleUnits};
    },
    data () {
        return{
            zipcode: '',
        };
    },
    methods: {
        getWeatherAndTide(){
            const weatherStore = useWeatherStore();
            if( this.zipcode) {
                weatherStore.setZipcode(this.zipcode); //update store w new zipcode
                this.zipcode = '';
            }

        },
    },
    
};
</script>