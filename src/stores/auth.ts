import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/axios.config";

import type User from "@/interfaces/user";

export const useAuthStore = defineStore("auth", () => {
  const user = ref({} as User);
  const token = ref(null as string | null);

  const isAuth = computed(() => token.value != null);
  const loading = computed(() => isAuth.value && !user.value.id);

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

      return { success: true };
    } catch (error: any) {
      const name = error.response.data.errors?.name || [];
      const email = error.response.data.errors?.email || [];
      const password = error.response.data.errors?.password || [];

      return { success: false, errors: { name, email, password } };
    }
  };

  const login = async (email: string, password: string) => {
    await csrfToken();

    try {
      const response = await axios.post("/login", { email, password });
      logUser(response.data.user, response.data.token);

      return { success: true };
    } catch (error) {
      return { success: false, error: error };
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
    loading,
    register,
    login,
    loginOAuth,
    loginOAuthCallback,
    logout,
  };
});
