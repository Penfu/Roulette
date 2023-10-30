<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

import { useUserSettings } from "@/composables/useUserSettings";

const auth = useAuthStore();
const { error, unlinkProvider } = useUserSettings();

const handleLogin = () => {
  auth.logout();
};
</script>

<template>
  <div class="px-4 sm:px-8 py-3 sm:py-6 bg-white rounded-lg space-y-4">
    <h2 class="text-xl font-semibold">Provider</h2>

    <div v-if="auth.user.provider" class="space-y-6">
      <p>
        You are logged in with
        <span class="px-2 py-1 capitalize font-semibold text-white bg-gray-800 rounded-md">{{
          auth.user.provider
        }}</span
        >. Your account is linked so you can't change your email or password.
      </p>

      <p>
        You can unlink your account from this provider and will receive your credentials by email at
        <span class="text-green-400 font-semibold">{{ auth.user.email }}</span
        >. Then you will be able to change your email and password.
      </p>

      <button @click="unlinkProvider" class="btn-primary w-full sm:w-auto md:w-full lg:w-auto">
        Unlink provider
      </button>
    </div>
    <div v-else class="space-y-6">
      <p>
        You can link your account with
        <span class="px-2 py-1 capitalize font-semibold text-white bg-gray-800 rounded-md"
          >Github</span
        >
        &nbsp;or
        <span class="px-2 py-1 capitalize font-semibold text-white bg-gray-800 rounded-md"
          >Google</span
        >
        &nbsp;to login with them.
      </p>
      <p>
        To link your account you need to
        <span
          @click="handleLogin"
          class="font-semibold text-green-400 hover:text-green-500 cursor-pointer"
        >
          login
        </span>
        with a provider account which has the same email as below. If you want to login with a
        provider account which has a different email, you can change your email here to match.
      </p>
      <p class="text-gray-600">
        You can unlink your account from a provider at any time. Linking or unlinking your account
        will conserve all your data !
      </p>
    </div>
  </div>
</template>
