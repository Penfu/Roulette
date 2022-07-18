import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import "./assets/main.css";

const app = createApp(App);

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_APP_WEBSOCKET_KEY,
  wsHost: import.meta.env.VITE_APP_WEBSOCKET_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
});

app.use(router);

app.mount("#app");
