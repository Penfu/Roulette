<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";

const userStore = useAuthStore();

const email = ref("");
const password = ref("");

const login = async () => {
  await userStore.login(email.value, password.value);

  if (userStore.isAuth) {
    router.push("/");
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">

      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Login</h2>

        <!-- OAuth -->
        <div class="w-full flex space-x-2 font-semibold">
          <button @click="userStore.loginOAuth('github')"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-gray-800 hover:bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Github
          </button>
          <button @click="userStore.loginOAuth('google')"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
            Google
          </button>
        </div>

        <!-- Manuel -->
        <form @submit.prevent="login" class="w-full flex flex-col space-y-6">
          <div>
            <label class="block">Email</label>
            <input type="email" v-model="email" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>
          <div>
            <label class="block">Password</label>
            <input type="password" v-model="password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
          </div>

          <button type="submit"
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">Login</button>
        </form>

        <router-link to="/register" class="block text-gray-600 hover:text-gray-800 text-center">
          Not already register ?
        </router-link>
      </div>
    </div>
  </main>
</template>
