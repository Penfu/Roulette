<script setup lang="ts">
import { ref } from "vue";
import { useConfirmDialog } from "@vueuse/core";

import { useUserSettings } from "@/composables/useUserSettings";

const { error, deleteAccount } = useUserSettings();

const { isRevealed, reveal, confirm, cancel, onReveal } = useConfirmDialog();
const password = ref("");

onReveal(() => {
  error.value = null;
  password.value = "";
});

const handleConfirm = async () => {
  await deleteAccount(password.value);

  if (error.value) {
    password.value = "";
    return;
  }

  confirm();
};
</script>

<template>
  <div class="px-4 sm:px-8 py-3 sm:py-6 bg-red-100 rounded-lg border-2 border-red-600 space-y-4">
    <div class="space-y-2">
      <h2 class="text-xl font-semibold">Delete your account</h2>
      <p class="text-red-600 font-semibold">
        This action is irreversible. All your data will be deleted.
      </p>
    </div>

    <button @click="reveal" type="button" class="btn-danger w-full sm:w-auto md:w-full lg:w-auto">
      Delete account
    </button>

    <teleport to="#app">
      <div
        v-if="isRevealed"
        @click="cancel"
        class="z-50 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[3px] flex justify-center items-end sm:items-center"
      >
        <div
          @click.stop
          class="sm:mx-8 p-8 md:p-10 max-w-2xl w-full bg-white rounded-t-3xl sm:rounded-lg space-y-12"
        >
          <div class="space-y-8">
            <h2 class="text-3xl font-bold">You're about to delete your account</h2>

            <p v-if="error" class="text-red-500">{{ error }}</p>

            <p class="text-gray-700">
              This is <span class="text-red-500 font-semibold">irreversible</span>. All your data
              will be deleted including your balance, bets, and profile.
            </p>

            <div class="space-y-2">
              <label for="password" class="font-semibold">Type your password to confirm</label>
              <input v-model="password" id="password" type="password" />
            </div>
          </div>

          <div class="flex flex-col-reverse md:flex-row gap-2 mt-4">
            <button @click="cancel" class="btn-secondary w-full">Cancel</button>
            <button @click="handleConfirm" :disabled="!password" class="btn-danger w-full">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
