import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import type User from "@/interfaces/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as User);

  const token = ref(null as string | null);
  const isAuth = computed(() => token.value != null);

  if (localStorage.getItem("token")) {
    token.value = localStorage.getItem("token");
    loginFromToken();
  }

  async function csrfToken() {
    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
  }

  async function register(name: string, email: string, password: string) {
    await csrfToken();

    try {
      const response = await axios.post("/register", {
        name,
        email,
        password,
      });
      logUser(response.data.user, response.data.token);

      return { success: true, message: "success" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        const { name, email, password } = error.response.data.errors;
        return { success: false, errors: { name, email, password } };
      }

      return { success: false, message: "error" };
    }
  }

  async function login(email: string, password: string) {
    await csrfToken();

    try {
      const response = await axios.post("/login", { email, password });
      logUser(response.data.user, response.data.token);

      return { success: true, message: "success" };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return { success: false, message: "invalid_credentials" };
      }

      return { success: false, message: "error" };
    }
  }

  async function loginFromToken() {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
    const response = await axios.get("/users/me");

    user.value = response.data;
  }

  async function loginOAuth(provider: string) {
    const response = await axios.get(`/authorize/${provider}/redirect`);

    if (response.data.redirect) {
      location.href = response.data.redirect;
      return;
    }
  }

  async function loginOAuthCallback(provider: string, code: string) {
    try {
      const response = await axios.get(`/authorize/${provider}/callback`, {
        params: { code },
      });
      logUser(response.data.user, response.data.token);

      return { success: true, message: "success" };
    } catch (error) {
      return { success: false, message: "error" };
    }
  }

  function logout() {
    user.value = {} as User;
    token.value = null;

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    location.reload();
  }

  function logUser(newUser: User, newToken: string) {
    user.value = newUser;
    token.value = newToken;

    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
  }

  return {
    user,
    token,
    isAuth,
    register,
    login,
    loginOAuth,
    loginOAuthCallback,
    logout,
  };
});
