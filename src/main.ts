import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import Axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = import.meta.env.VITE_APP_URL + "/api";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_WEBSOCKET_KEY,
  wsHost: import.meta.env.VITE_APP_WEBSOCKET_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

app.use(pinia);
app.use(router);

app.mount("#app");
