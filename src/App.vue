

<template>
  <div class="full-page  d-flex flex-column bg-success-subtle">
      <div class = "container-fluid"> 
        <div class="row p-3">
          <div class="col">
            <Header />
          </div>
          <div class="col">
            <zipcode-input />
          </div>
        </div>
      </div>
      <hr>
    
    <main class="flex-grow-1">
      <TodayTideMobile v-if = "isMobile" />
      <TodayTide v-else />
     
    </main>
    <footer class="mt-auto">
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
      return {isMobile};
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


</style>
