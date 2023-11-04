import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

import type User from "@/interfaces/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as User);

  const token = ref(null as string | null);
  const isAuth = computed(() => token.value != null);

  const csrfToken = async () => {
    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
  };

  const register = async (name: string, email: string, password: string) => {
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
  };

  const login = async (email: string, password: string) => {
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
  };

  const loginFromToken = async () => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
    const response = await axios.get("/users/me");

    user.value = response.data;
  };

  const loginOAuth = async (provider: string) => {
    const response = await axios.get(`/authorize/${provider}/redirect`);

    if (response.data.redirect) {
      location.href = response.data.redirect;
      return;
    }
  };

  const loginOAuthCallback = async (provider: string, code: string) => {
    try {
      const response = await axios.get(`/authorize/${provider}/callback`, {
        params: { code },
      });
      logUser(response.data.user, response.data.token);

      return { success: true, message: "success" };
    } catch (error) {
      return { success: false, message: "error" };
    }
  };

  const logout = () => {
    user.value = {} as User;
    token.value = null;

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    location.reload();
  };

  const logUser = (newUser: User, newToken: string) => {
    user.value = newUser;
    token.value = newToken;

    localStorage.setItem("token", newToken);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token.value;
  };

  // Auto login
  if (localStorage.getItem("token")) {
    token.value = localStorage.getItem("token");
    loginFromToken();
  }

  return {
    user,
    isAuth,
    register,
    login,
    loginOAuth,
    loginOAuthCallback,
    logout,
  };
});
