<script setup lang="ts">
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useUserSettings } from "@/composables/useUserSettings";

const { error, updateEmail } = useUserSettings();
const { user } = useAuthStore();

const email = ref(user.email);
const password = ref("");

const handleUpdateEmail = () => {
  updateEmail(email.value, password.value);
  password.value = "";
};
</script>

<template>
  <div class="space-y-4 drop-shadow-lg">
    <h1 class="text-4xl font-bold">Account Settings</h1>

    <form
      @submit.prevent="handleUpdateEmail"
      class="px-4 sm:px-8 py-3 sm:py-6 bg-white rounded-lg space-y-4"
    >
      <h2 class="text-xl font-semibold">Change your email</h2>

      <p v-if="error" class="text-red-500">{{ error }}</p>
      <div class="space-y-6">
        <div class="space-y-2">
          <label class="block" for="email">Your email</label>
          <input v-model="email" type="email" />
        </div>

        <div class="space-y-2">
          <label class="block" for="email">Confirm your password</label>
          <input v-model="password" type="password" />
        </div>

        <button type="submit" class="btn-primary w-full sm:w-auto md:w-full lg:w-auto">
          Change email
        </button>
      </div>
    </form>
  </div>
</template>
