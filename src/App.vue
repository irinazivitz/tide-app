

<template>
  <div class="full-page  d-flex flex-column main-background">
      <div class = "container-fluid header-area"> 
        <div class="row p-3">
          <div class="col">
            <Header />
          </div>
          <div class="col">
            <zipcode-input />
          </div>
        </div>
      </div>
     <!-- <hr> -->
    
    <main class="flex-grow-1">
      <TodayTideMobile v-if = "isMobile" />
      <TodayTide v-else />
     
    </main>
    <footer class="footer-custom mt-auto">
       &copy; 2024 All rights reserved. 
    </footer>
  </div>
</template>

<script>
  import TodayTide from './components/TodayTide.vue';
  import TodayTideMobile from './components/TodayTideMobile.vue';
  import Header from './components/AppHeader.vue';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import ZipcodeInput from './components/ZipcodeInput.vue';
  import { useWeatherStore } from './weatherStore'; 
  import {onMounted, onBeforeUnmount, computed } from 'vue';



  export default {
    components: {
      TodayTide,
      Header,
      ZipcodeInput,
      TodayTideMobile,
    },
    setup() {
      const weatherStore = useWeatherStore();

      const handleResize = () => {
        weatherStore.checkIfMobile();
      };

      onMounted(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
      });

      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
      });
      const isMobile = computed (() => weatherStore.isMobile);
      return {isMobile}
    },
  };
</script>


<style>
.full-page{
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-direction: column;
  justify-content: space-between;
}

main {
  flex-grow: 1;
}

footer {
  margin-top: auto;
}
.footer-custom{
  background-color: #2B4560;
  color: #e1e7e0;
  padding: 10px;
  text-align: center;
}
.header-area{
  background: linear-gradient(180deg, #2F6D80, #1C4A5B);
  color: #e1e7e0;
  border-bottom: 1px solid #6f8880;
  
}
.main-background{
  background-color: #6AA4B0
}



</style>
