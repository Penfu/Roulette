import { ref } from "vue";
import router from "@/router";
import axios from "axios";

import { useAuthStore } from "@/stores/auth";

export function useUserSettings() {
  const error = ref<string | null>(null);
  const auth = useAuthStore();

  async function updateName(name: string) {
    try {
      const response = await axios.patch("/users/me/name", { name });

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  }

  async function updateEmail(email: string, password: string) {
    try {
      const response = await axios.patch("/users/me/email", { email, password });

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  }

  async function updatePassword(password: string, newPassword: string, newPasswordConfirmation: string) {
    try {
      const response = await axios.patch("/users/me/password", {
        password,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      });

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  }

  async function unlinkProvider() {
    try {
      const response = await axios.delete("/users/me/provider");

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  }

  async function deleteAccount(keyword: string) {
    try {
      await axios.delete("/users/me", { data: { keyword } });
      error.value = null;

      auth.logout();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("err", err.response?.data.message);

        error.value = err.response?.data.message;
      }
    }
  }

  return { error, updateName, updateEmail, updatePassword, unlinkProvider, deleteAccount };
}
