<script setup lang="ts">
import { computed, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import axios from "@/axios.config";

import { useAuthStore } from "@/stores/auth";

import PendingButton from "@/components/PendingButton.vue";

const auth = useAuthStore();
const name = ref(auth.user.name);

const { isPending, isError, error, mutate } = useMutation({
  mutationFn: (name: string) => axios.patch("/users/me/name", { name }),
  onSuccess: (data) => {
    auth.user = data.data;
  },
});

const canSubmit = computed(() => !isPending.value && name.value && name.value !== auth.user.name);

const handleUpdateName = () => {
  if (!canSubmit.value) return;

  mutate(name.value);
};
</script>

<template>
  <form
    @submit.prevent="handleUpdateName"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-bkg-1 rounded-lg space-y-4"
  >
    <h2 class="text-xl font-semibold">Change your name</h2>

    <p v-if="isError" class="text-red">{{ error?.message }}</p>
    <div class="space-y-6">
      <div class="space-y-2">
        <label for="name" class="block">Your name</label>
        <input v-model="name" id="name" type="text" autocomplete="username" />
      </div>

      <PendingButton :disabled="!canSubmit" :pending="isPending">Change name</PendingButton>
    </div>
  </form>
</template>
