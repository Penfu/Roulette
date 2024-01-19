import { ref } from "vue";
import axios from "axios";

import type avatarOptions from "@/interfaces/avatarOptions";

import { useAuthStore } from "@/stores/auth";

export const useUserSettings = () => {
  const error = ref<string | null>(null);
  const auth = useAuthStore();

  const updateAvatar = async (options: avatarOptions) => {
    try {
      const response = await axios.patch("/users/me/avatar", { options });

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  };

  const updatePassword = async (
    password: string,
    newPassword: string,
    newPasswordConfirmation: string
  ) => {
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
  };

  const unlinkProvider = async () => {
    try {
      const response = await axios.delete("/users/me/provider");

      auth.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  };

  const deleteAccount = async (keyword: string) => {
    try {
      await axios.delete("/users/me", { data: { keyword } });
      error.value = null;

      auth.logout();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  };

  return {
    error,
    updateAvatar,
    updatePassword,
    unlinkProvider,
    deleteAccount,
  };
};
