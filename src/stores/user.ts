import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const user = ref({
    name: "" as string,
    email: "" as string,
    balance: 0 as number,
  });
  const token = ref(null as string | null);
  const isAuth = computed(() => token.value != null);

  if (localStorage.getItem("token")) {
    token.value = localStorage.getItem("token");
    loginFromToken();
  }

  async function getCsrfToken() {
    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
  }

  async function register(name: string, email: string, password: string) {
    await getCsrfToken();

    const response = await axios.post("/register", {
      name,
      email,
      password,
    });

    user.value = response.data.user;
    token.value = response.data.token;

    localStorage.setItem("token", response.data.token);
  }

  async function login(email: string, password: string) {
    await getCsrfToken();

    const response = await axios.post("/login", {
      email,
      password,
    });

    user.value = response.data.user;
    token.value = response.data.token;

    localStorage.setItem("token", response.data.token);
  }

  async function loginFromToken() {
    await getCsrfToken();

    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
    const response = await axios.get("/users/me");

    user.value = response.data;
  }

  function logout() {
    user.value = {
      name: "",
      email: "",
      balance: 0,
    };
    token.value = null;

    localStorage.removeItem("token");
  }

  return { user, token, isAuth, register, login, logout };
});
