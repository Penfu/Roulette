import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
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
    loginFromToken(token.value as string);
  }

  watch(
    token,
    (newToken) => {
      if (newToken == null) localStorage.removeItem("token");
      else localStorage.setItem("token", JSON.stringify(newToken));
    },
    {
      deep: true,
    }
  );

  async function getCsrfToken() {
    await axios.get(import.meta.env.VITE_APP_URL + "/sanctum/csrf-cookie");
  }

  async function loginFromToken(token: string) {
    await getCsrfToken();

    console.log("toke ddn", token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    const response = await axios.get("/users/me");

    user.value = response.data;
  }

  async function login(email: string, password: string) {
    await getCsrfToken();

    await axios
      .post("/login", {
        email,
        password,
      })
      .then((response) => {
        user.value = response.data.user;
        token.value = response.data.token;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    user.value = {
      name: "",
      email: "",
      balance: 0,
    };
    token.value = null;
  }

  return { user, token, isAuth, login, logout };
});
