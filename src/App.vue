

<template>
  <div class="full-page p-3 mb-2 bg-success-subtle">
      <div class = "container-fluid"> 
        <div class="row">
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
      <today-tide />
    </main>
    <footer class="mt-auto">
       &copy; 2024 All rights reserved. 
    </footer>
  </div>
</template>

<script>
import TodayTide from './components/TodayTide.vue';
import Header from './components/AppHeader.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import ZipcodeInput from './components/ZipcodeInput.vue';



export default {
  components: {
   
    TodayTide,
    Header,
    ZipcodeInput
  }

   }
</script>


<style>
.full-page{
  min-height: 100vh;
  width: 100%;
  margin: 0;
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
