import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({
    name: "" as string,
    email: "" as string,
    balance: 0 as number,
  });
  const authErrors = ref({
    name: [] as string[],
    email: [] as string[],
    password: [] as string[],
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

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });

      user.value = response.data.user;
      token.value = response.data.token;

      localStorage.setItem("token", response.data.token);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        authErrors.value.name = error.response.data.errors.name || [];
        authErrors.value.email = error.response.data.errors.email || [];
        authErrors.value.password = error.response.data.errors.password || [];
      }
    }
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

  async function loginGithub() {
    const response = await axios.get("/authorize/github/redirect");
    console.log("Redirect response", response.data);

    if (response.data.redirect) {
      window.location.href = response.data.redirect;
      return;
    }

    user.value = response.data.user;
    token.value = response.data.token;

    localStorage.setItem("token", response.data.token);
  }

  async function loginGithubCallback(code: string) {
    const response = await axios.get("/authorize/github/callback", {
      params: { code },
    });
    console.log("Callback response", response.data);

    user.value = response.data.user;
    token.value = response.data.token;

    localStorage.setItem("token", response.data.token);
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

  return { user, authErrors, token, isAuth, register, login, loginGithub, loginGithubCallback, logout };
});
