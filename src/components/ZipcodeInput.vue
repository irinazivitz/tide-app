<template>
    <form class="input-group mb-3 shrink-form" v-on:submit.prevent="getWeatherAndTide"> 
        <input 
            type="text" 
            class="form-control" 
            placeholder="Enter zip" 
            aria-label="zipcode"
            aria-describedby="button-addon2" 
            v-model="zipcode" />
        <div class ="d-flex align-items-center" >
            <button class ="btn" type="submit" style="background-color: #2B4560">
                <!-- <i class= "fas fa-search" style="color: #e1e7e0"></i> -->
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="#e1e7e0" stroke="#e1e7e0" stroke-width="15">
                    <path d="M505 442.7L405.3 343c28.4-34.8 45.7-79.5 
                    45.7-128.3 0-111-90.3-201.3-201.3-201.3S48.4 103.7 
                    48.4 214.7 138.7 416 249.7 416c48.8 0 93.5-17.3 
                    128.3-45.7l99.7 99.7c9.3 9.3 24.4 9.3 33.7 0 9.4-9.3 
                    9.4-24.4 0-33.7zM80.4 214.7c0-93.2 76-169.3 169.3-169.3S419 
                    121.5 419 214.7 343 384 249.7 384c-93.2 0-169.3-76.1-169.3-169.3z"/>
                </svg>
            </button>
            <!-- <i  v-if = " weatherStore.isMobile" 
                class = "fas fa-cog ms-2" 
                @click = "showModal = true" 
                style="cursor: pointer;" >
            </i> -->

   


            <!-- modal structure 
            <div class = "modal fade" 
                :class="{ show: showModal }" 
                tabindex="-1" 
                style="display: block;" 
                v-if="showModal"
                @click.self="closeModal">
                <div class="modal-dialog">
                    <div class = "modal-content">
                        <div class = "modal-header">
                            <h5 class="modal-title "> Settings</h5>
                            <button type="button" class="btn-close" @click="closeModal"> </button>
                        </div>
                        <div class="modal-body">
                            <p>Select your preferred units:</p>
                            <div class="form-check">
                                <input 
                                    class="form-check-input"
                                    type="radio"
                                    id="unitC"
                                    value="C"
                                    v-model="weatherStore.tempUnit">
                                <label class="form-check-input ms-2" for="unitC">Celsius</label>
                            </div>
                            <div class="form-check">
                                <input 
                                    class="form-check-input"
                                    type="radio"
                                    id="unitF"
                                    value="F"
                                    v-model="weatherStore.tempUnit">
                                <label class="form-check-input ms-2" for="unitF">Fahrenheit</label>
                            </div>
                            <div class="form-check">
                                <input 
                                    class="form-check-input"
                                    type="radio"
                                    id="unitFeet"
                                    value="ft"
                                    v-model="weatherStore.heightUnit">
                                <label class="form-check-input ms-2" for="unitFeet">Feet</label>
                            </div>
                            <div class="form-check">
                                <input 
                                    class="form-check-input"
                                    type="radio"
                                    id="unitMeters"
                                    value="meters"
                                    v-model="weatherStore.heightUnit">
                                <label class="form-check-input ms-2" for="unitMeters">Meters</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>  
    </form>
  
</template>

<script>
import {useWeatherStore} from '../weatherStore'; 
export default {
    setup () {
        const weatherStore = useWeatherStore();
        return { weatherStore};
    },  
    data () {
        return{
            zipcode: '',
            showModal: false,
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
        closeModal(){
            this.showModal = false;
        },
    
    },
    
};
</script>

<style >
.shrink-form {
    max-width: 400px;
    margin: 0 auto;

}
.input-group :focus {
   outline: 2px solid #2B4560; 
  border-radius: 4px; 
}


</style>