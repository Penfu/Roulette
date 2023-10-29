<script setup lang="ts">
import { useUserSettings } from "@/composables/useUserSettings";

const { deleteAccount } = useUserSettings();

const handleDeleteAccount = () => {
  deleteAccount();
};
</script>

<template>
  <form
    @submit.prevent="handleDeleteAccount"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-red-100 rounded-lg border-2 border-red-600 space-y-4"
  >
    <div class="space-y-2">
      <h2 class="text-xl font-semibold">Delete your account</h2>
      <p class="text-red-600 font-semibold">This action is irreversible. All your data will be deleted.</p>
    </div>

    <button type="submit" class="btn-danger w-full sm:w-auto md:w-full lg:w-auto">
      Delete account
    </button>
  </form>
</template>
