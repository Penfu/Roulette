<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import axios from '@/configs/axios';

import { useAuthStore } from '@/stores/auth';

import PendingButton from '@/components/PendingButton.vue';

const auth = useAuthStore();

const password = ref('');
const newPassword = ref('');
const newPasswordConfirmation = ref('');

const passwordMatch = computed(() => newPassword.value === newPasswordConfirmation.value);

const canSubmit = computed(() => password.value && passwordMatch.value);

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: () =>
    axios.patch('/users/me/password', {
      password: password.value,
      new_password: newPassword.value,
      new_password_confirmation: newPasswordConfirmation.value,
    }),
  onSettled: () => {
    password.value = '';
    newPassword.value = '';
    newPasswordConfirmation.value = '';
  },
  onSuccess: (data) => {
    auth.user = data.data;
  },
});
</script>

<template>
  <section class="space-y-4">
    <h4>Change your password</h4>

    <form @submit.prevent="mutate()" class="space-y-2">
      <p v-if="isError || !passwordMatch" class="text-red">
        {{ !passwordMatch ? "Passwords don't match" : error?.message }}
      </p>
      <div class="space-y-6">
        <div class="space-y-2">
          <label for="current_password" class="block">Your current password</label>
          <input v-model="password" id="current_password" type="password" />
        </div>

        <div class="space-y-2">
          <label for="new_password" class="block">Your new password</label>
          <input v-model="newPassword" id="new_password" type="password" />
        </div>

        <div class="space-y-2">
          <label for="new_password_confirmation" class="block">Confirm your new password</label>
          <input v-model="newPasswordConfirmation" id="new_password_confirmation" type="password" />
        </div>

        <PendingButton type="submit" :disabled="!canSubmit" :pending="isPending" class="btn-primary w-full sm:w-auto">
          Change password
        </PendingButton>
      </div>
    </form>
  </section>
</template>
