<script setup lang="ts">
import router from "@/router";
import { nextTick, ref } from "vue";

import { useAuthStore } from "@/stores/auth";

const userStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");

const login = async () => {
  const resp = await userStore.login(email.value, password.value);

  if (resp.success) {
    nextTick(() => {
      router.push("/");
    });
  } else {
    error.value = resp.message;
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="mx-auto max-w-lg my-16 space-y-12">
      <h2 class="text-center text-5xl font-semibold uppercase">Login</h2>

      <div class="space-y-8">
        <!-- OAuth -->
        <div class="flex space-x-2 font-semibold">
          <button
            @click="userStore.loginOAuth('github')"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-gray-800 hover:bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            Github
          </button>
          <button
            @click="userStore.loginOAuth('google')"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          >
            Google
          </button>
        </div>

        <!-- Manuel -->
        <form @submit.prevent="login" class="space-y-8">
          <div class="h-64 space-y-2">
            <label class="block text-red-500">{{ error }}</label>

            <div class="space-y-6">
              <div class="space-y-2">
                <label class="block">Email</label>
                <input
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
                />
              </div>
              <div class="space-y-2">
                <label class="block">Password</label>
                <input
                  v-model="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg"
          >
            Login
          </button>
        </form>
      </div>

      <router-link to="/register" class="block text-center text-gray-600 hover:text-gray-800">
        Not already register ?
      </router-link>
    </div>
  </main>
</template>