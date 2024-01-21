import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import { MotionPlugin } from "@vueuse/motion";


import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api";

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
app.use(VueQueryPlugin);
app.use(MotionPlugin);

app.mount("#app");
