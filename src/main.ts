import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import Axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { MotionPlugin } from "@vueuse/motion";


import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_WEBSOCKET_KEY,
  cluster: import.meta.env.VITE_APP_WEBSOCKET_CLUSTER,
  forceTLS: true,
});

app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.use(MotionPlugin);

app.mount("#app");
