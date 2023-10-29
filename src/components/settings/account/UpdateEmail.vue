<script setup lang="ts">
import { computed, ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useUserSettings } from "@/composables/useUserSettings";

const { error, updateEmail } = useUserSettings();
const auth = useAuthStore();

const email = ref(auth.user.email);
const password = ref("");

const formIsValid = computed(() => {
  return email.value && email.value !== auth.user.email && password.value;
});

const handleUpdateEmail = () => {
  if (!formIsValid) return;

  updateEmail(email.value, password.value);
  password.value = "";
};
</script>

<template>
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

      <button
        :disabled="!formIsValid"
        type="submit"
        class="btn-primary w-full sm:w-auto md:w-full lg:w-auto"
      >
        Change email
      </button>
    </div>
  </form>
</template>
