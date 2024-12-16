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
                <i class= "fas fa-search" style="color: #e1e7e0"></i>
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