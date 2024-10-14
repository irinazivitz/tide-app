<template>
    <form class="input-group mb-3" v-on:submit.prevent="getWeatherAndTide"> 
        <input 
            type="text" 
            class="form-control" 
            placeholder="Enter zip" 
            aria-label="zipcode"
            aria-describedby="button-addon2" 
            v-model="zipcode" />
        <div class ="d-flex align-items-center" >
            <button class ="btn" type="submit" style="background-color: rgba(73, 81, 80, 0.118">
                <i class= "fas fa-search"></i>
            </button>
            <i v-if = " weatherStore.isMobile" class = "fas fa-cog ms-2" @click = "toggleUnits" style="cursor: pointer;" ></i>
        </div>
        
    </form>
    
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