import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// @ts-ignore
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import router from "./router";

import Echo from "laravel-echo";
import Pusher from "pusher-js";

import "./assets/main.css";

const app = createApp(App);
const pinia = createPinia();

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
