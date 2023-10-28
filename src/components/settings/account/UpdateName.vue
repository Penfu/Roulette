<script setup lang="ts">
import { ref } from "vue";

import { useAuthStore } from "@/stores/auth";
import { useUserSettings } from "@/composables/useUserSettings";

const { error, updateName } = useUserSettings();
const auth = useAuthStore();

const name = ref(auth.user.name);

const handleUpdateName = () => {
  if (name.value === auth.user.name) {
    return;
  }

  updateName(name.value);
};
</script>

<template>
  <form
    @submit.prevent="handleUpdateName"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-white rounded-lg space-y-4"
  >
    <h2 class="text-xl font-semibold">Change your name</h2>

    <p v-if="error" class="text-red-500">{{ error }}</p>
    <div class="space-y-6">
      <div class="space-y-2">
        <label class="block" for="name">Your name</label>
        <input v-model="name" type="text" />
      </div>

      <button type="submit" class="btn-primary w-full sm:w-auto md:w-full lg:w-auto">
        Change name
      </button>
    </div>
  </form>
</template>
