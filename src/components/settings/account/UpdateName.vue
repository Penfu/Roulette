<script setup lang="ts">
import { ref, computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import axios from '@/configs/axios';

import { useAuthStore } from '@/stores/auth';

import PendingButton from '@/components/PendingButton.vue';

const auth = useAuthStore();

const name = ref(auth.user?.name);

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: () => axios.patch('/users/me/name', { name: name.value }),
  onSuccess: (data) => {
    auth.user = data.data;
  },
});

const canSubmit = computed(() => !isPending.value && name.value && name.value !== auth.user?.name);
</script>

<template>
  <section class="space-y-4">
    <h4>Change your name</h4>

    <form @submit.prevent="mutate()" class="space-y-2">
      <p v-if="isError" class="text-red">{{ error?.message }}</p>
      <div class="space-y-6">
        <div class="space-y-2">
          <label for="name" class="block">Your name</label>
          <input v-model="name" id="name" type="text" autocomplete="username" />
        </div>

        <PendingButton type="submit" :disabled="!canSubmit" :pending="isPending" class="btn-primary w-full sm:w-auto">
          Change name
        </PendingButton>
      </div>
    </form>
  </section>
</template>
