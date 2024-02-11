<script setup lang="ts">
import { nextTick, ref } from 'vue';
import router from '@/router';

import { useAuthStore } from '@/stores/auth';

const { login, loginOAuth } = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref();

const handleLogin = async () => {
  const response = await login(email.value, password.value);

  if (response.success) {
    nextTick(() => {
      router.push('/');
    });
  } else {
    error.value = response.error;
    password.value = '';
  }
};
</script>

<template>
  <main class="flex justify-center items-center">
    <section class="w-full sm:max-w-xl py-12 space-y-12 sm:space-y-20">
      <h2 class="text-4xl sm:text-5xl text-center font-semibold uppercase">Login</h2>

      <div class="h-[36rem] flex flex-col space-y-8">
        <div class="h-full flex flex-col space-y-8">
          <!-- OAuth -->
          <div class="flex flex-col xs:flex-row gap-4">
            <button @click="loginOAuth('github')" class="btn w-full text-white bg-black hover:bg-black-dark">
              Github
            </button>
            <button @click="loginOAuth('google')" class="btn w-full bg-gray-200 hover:bg-gray-300">Google</button>
          </div>

          <div class="flex items-center justify-center">
            <span class="w-full h-px bg-gray-300"></span>
            <span class="px-4 text-gray-700">or</span>
            <span class="w-full h-px bg-gray-300"></span>
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
                  <input v-model="password" id="password" type="password" autocomplete="current-password" required />
                </div>
              </div>
            </div>

            <button type="submit" class="btn-primary w-full">Login</button>
          </form>
        </div>

        <div class="flex flex-wrap justify-center gap-2 text-gray-700">
          <span>Don't have an account?</span>
          <router-link to="/register" class="text-green hover:text-green-dark font-semibold">Register</router-link>
        </div>
      </div>
    </section>
  </main>
</template>
