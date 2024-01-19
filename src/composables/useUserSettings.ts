import { ref } from "vue";
import axios from "axios";

import { useAuthStore } from "@/stores/auth";

export const useUserSettings = () => {
  const error = ref<string | null>(null);
  const auth = useAuthStore();

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

  return {
    error,
    unlinkProvider,
  };
};
