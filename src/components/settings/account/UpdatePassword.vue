<script setup lang="ts">
import { computed, ref } from "vue";

import { useUserSettings } from "@/composables/useUserSettings";

const { error, updatePassword } = useUserSettings();

const password = ref("");
const newPassword = ref("");
const newPasswordConfirmation = ref("");

const passwordMismatch = computed(() => {
  return (
    newPassword.value &&
    newPasswordConfirmation.value &&
    newPassword.value !== newPasswordConfirmation.value
  );
});

const formIsValid = computed(() => password.value && !passwordMismatch.value);

const handleUpdatePassword = async () => {
  if (!formIsValid) return;

  await updatePassword(password.value, newPassword.value, newPasswordConfirmation.value);

  password.value = "";
  newPassword.value = "";
  newPasswordConfirmation.value = "";
};
</script>

<template>
  <form
    @submit.prevent="handleUpdatePassword"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-bkg-1 rounded-lg space-y-4"
  >
    <h2 class="text-xl font-semibold">Change your password</h2>

    <p v-if="error || passwordMismatch" class="text-red">
      {{ passwordMismatch ? "Passwords don't match" : error }}
    </p>
    <div class="space-y-6">
      <div class="space-y-2">
        <label class="block" for="name">Your current password</label>
        <input v-model="password" type="password" />
      </div>

      <div class="space-y-2">
        <label class="block" for="name">Your new password</label>
        <input v-model="newPassword" type="password" />
      </div>

      <div class="space-y-2">
        <label class="block" for="name">Confirm your new password</label>
        <input v-model="newPasswordConfirmation" type="password" />
      </div>

      <button
        :disabled="!formIsValid"
        type="submit"
        class="btn-primary w-full sm:w-auto md:w-full lg:w-auto"
      >
        Change password
      </button>
    </div>
  </form>
</template>
