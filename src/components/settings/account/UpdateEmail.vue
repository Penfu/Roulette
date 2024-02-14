<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import axios from '@/configs/axios';

import { useAuthStore } from '@/stores/auth';

import PendingButton from '@/components/PendingButton.vue';

const auth = useAuthStore();

const email = ref(auth.user.email);
const password = ref('');

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: () => axios.patch('/users/me/email', { email: email.value, password: password.value }),
  onSettled: () => {
    password.value = '';
  },
  onSuccess: (data) => {
    auth.user = data.data;
  },
});

const canSubmit = computed(() => !isPending.value && email.value !== auth.user.email && password.value);
</script>

<template>
  <section class="space-y-4">
    <h4>Change your email</h4>

    <form @submit.prevent="mutate()" class="space-y-2">
      <p v-if="isError" class="text-red">{{ error?.message }}</p>
      <div class="space-y-6">
        <div class="space-y-2">
          <label for="email" class="block">Your email</label>
          <input v-model="email" id="email" type="email" autocomplete="email" />
        </div>

        <div class="space-y-2">
          <label for="password" class="block">Confirm your password</label>
          <input v-model="password" id="password" type="password" />
        </div>

        <PendingButton type="submit" :disabled="!canSubmit" :pending="isPending" class="btn-primary w-full sm:w-auto">
          Change email
        </PendingButton>
      </div>
    </form>
  </section>
</template>
