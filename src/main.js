import './assets/main.css'

import { createApp } from 'vue';
import { createPinia} from 'pinia';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.mount('#app')
