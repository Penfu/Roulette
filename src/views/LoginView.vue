<script setup lang="ts">
import { nextTick, ref } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

const { login, loginOAuth } = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref();

const handleLogin = async () => {
  const response = await login(email.value, password.value);

  if (response.success) {
    nextTick(() => {
      router.push("/");
    });
  } else {
    error.value = response.error;
    password.value = "";
  }
};
</script>

<template>
  <main class="flex justify-center items-center">
    <section class="w-full max-w-xl py-16 space-y-24">
      <h2 class="text-center text-5xl font-semibold uppercase">Login</h2>

      <div class="h-[36rem] flex flex-col space-y-8">
        <div class="h-full flex flex-col space-y-8">
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
              class="btn w-full text-gray-700 bg-gray-200 hover:bg-gray-300 border-gray-300 shadow"
            >
              Google
            </button>
          </div>

          <!-- Standard auth -->
          <form @submit.prevent="handleLogin" class="grow h-full flex flex-col">
            <div class="grow h-full space-y-2">
              <span v-if="error" class="block text-red">{{ error?.message }}</span>

              <div class="space-y-6">
                <div class="space-y-2">
                  <label for="email" class="block">Email</label>
                  <input v-model="email" id="email" type="email" autocomplete="email" required />
                </div>
                <div class="space-y-2">
                  <label for="password" class="block">Password</label>
                  <input
                    v-model="password"
                    id="password"
                    type="password"
                    autocomplete="current-password"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full">Login</button>
          </form>
        </div>

        <div class="flex flex-wrap justify-center gap-2 text-gray-700">
          <span>Don't have an account?</span>
          <router-link to="/register" class="text-green hover:text-green-dark font-semibold">
            Register
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>
