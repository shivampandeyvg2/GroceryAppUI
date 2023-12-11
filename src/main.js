import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/index.js'



const app = createApp(App); 
app.use(router); 

app.config.globalProperties.$globals = {
    token: null,
    userid: null
    // ... Add more global variables here as needed
  };
app.mount('#app');