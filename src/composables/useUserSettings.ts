import { ref } from "vue";
import axios from "axios";

import { useAuthStore } from "@/stores/auth";

export function useUserSettings() {
  const error = ref(null);
  const authStore = useAuthStore();

  async function updateName(name: string) {
    try {
      const response = await axios.patch("/users/me/name", { name });

      authStore.user = response.data;
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

      authStore.user = response.data;
      error.value = null;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        error.value = err.response?.data.message;
      }
    }
  }

  return { error, updateName, updateEmail };
}
