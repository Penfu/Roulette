<script setup lang="ts">
import { nextTick, ref } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

const { login, loginOAuth } = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  const response = await login(email.value, password.value);

  if (response.success) {
    nextTick(() => {
      router.push("/");
    });
  } else {
    if (response.message === "invalid_credentials") {
      error.value = "Invalid credentials";
    } else {
      error.value = "An error occured";
    }

    password.value = "";
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="mx-auto max-w-lg pt-16 pb-8 space-y-12">
      <h2 class="text-center text-5xl font-semibold uppercase">Login</h2>

      <div class="space-y-4">
        <div class="space-y-8">
          <!-- OAuth -->
          <div class="flex space-x-2 font-semibold">
            <button
              @click="loginOAuth('github')"
              class="btn w-full text-white bg-black hover:bg-black-dark border-gray-300 shadow"
            >
              Github
            </button>
            <button
              @click="loginOAuth('google')"
              class="btn w-full text-gray-700 bg-bkg-1 hover:bg-gray-200 border-gray-300 shadow"
            >
              Google
            </button>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-8">
            <div class="h-64 space-y-2">
              <span class="block text-red">{{ error }}</span>

              <div class="space-y-6">
                <div class="space-y-2">
                  <label for="email" class="block">Email</label>
                  <input
                    v-model="email"
                    id="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="bg-bkg-1"
                  />
                </div>
                <div class="space-y-2">
                  <label for="password" class="block">Password</label>
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="bg-bkg-1"
                  />
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full">Login</button>
          </form>
        </div>

        <div class="flex flex-wrap justify-center gap-2 text-gray-700">
          <span>Don't have an account?</span>
          <router-link to="/register" class="text-green hover:text-green-dark">
            Register
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
