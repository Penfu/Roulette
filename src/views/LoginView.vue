<script lang="ts">
import { useUserStore } from "../stores/user";

// axios.defaults.withCredentials = true;

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      csrfToken: "" as string,
      email: "" as string,
      password: "" as string,
      errors: {},
    };
  },
  methods: {
    async login() {
      await this.userStore.login(this.email, this.password);

      if (this.userStore.isAuth) {
        this.$router.push("/");
      }
    }
  },
};
</script>

<template>
  <main class="mx-4 sm:mx-8 md:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <h2 class="text-3xl font-semibold uppercase">Login</h2>

      <!-- OAuth -->
      <div class="max-w-lg w-full flex space-x-2 font-semibold">
        <a href="http://localhost:8000/api/login/github"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-gray-800 hover:bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Github
        </a>
        <a href="http://localhost:8000/api/login/google"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Google
        </a>
      </div>

      <!-- Manuel -->
      <form @submit.prevent="login" class="max-w-lg w-full flex flex-col space-y-6">
        <div>
          <label class="block">Email</label>
          <input type="email" v-model="email" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <div>
          <label class="block">Password</label>
          <input type="password" v-model="password" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <button type="submit" class="w-full px-4 py-3 bg-gray-800 rounded text-white">Login</button>
      </form>
    </div>
  </main>
</template>
