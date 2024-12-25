import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router"; // 引入路由

createApp(App).use(router).mount("#app");