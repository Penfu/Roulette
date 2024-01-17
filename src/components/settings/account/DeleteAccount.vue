<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

import { useAuthStore } from "@/stores/auth";

import { useUserSettings } from "@/composables/useUserSettings";

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const { error, deleteAccount } = useUserSettings();

const closeBtnElement = ref(null);
const isOpen = ref(false);
const keyword = ref("");

const closeModal = () => {
  isOpen.value = false;
};

const openModal = () => {
  error.value = null;
  keyword.value = "";

  isOpen.value = true;
};

const handleConfirm = async () => {
  await deleteAccount(keyword.value);

  if (error.value) {
    keyword.value = "";
    return;
  }

  closeModal();
};
</script>

<template>
  <div
    class="px-4 sm:px-8 py-3 sm:py-6 bg-red-100 dark:bg-opacity-90 rounded-lg border-2 border-red-dark space-y-4"
  >
    <div class="space-y-2">
      <h2 class="text-xl text-black font-semibold">Delete your account</h2>
      <p>
        <span class="text-red-dark font-semibold">
          This action is irreversible. All your data will be lost.
        </span>
        <span class="dark:text-black">You’ll get a chance to confirm your choice.</span>
      </p>
    </div>

    <button
      @click="openModal"
      type="button"
      class="btn-danger w-full sm:w-auto"
    >
      Delete account
    </button>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog :initialFocus="closeBtnElement" as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
        as="template"
      >
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 flex justify-center items-end sm:items-center">
        <TransitionChild
          enter="duration-300 ease-out"
          enter-from="translate-y-12 sm:opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="duration-200 ease-in"
          leave-from="translate-y-0 sm:opacity-100 sm:scale-100"
          leave-to="translate-y-12 sm:opacity-0 sm:translate-y-0 sm:scale-95"
          as="template"
        >
          <DialogPanel
            class="sm:mx-8 px-6 py-8 md:px-8 md:py-10 max-w-2xl w-full bg-bkg-1 rounded-t-3xl sm:rounded-lg space-y-12"
          >
            <DialogTitle as="h2" class="text-3xl font-bold">
              You're about to delete your account
            </DialogTitle>

            <div class="space-y-8">
              <p v-if="error" class="text-red">{{ error }}</p>
              <p class="text-gray-700">
                This is <span class="text-red font-semibold">irreversible</span>. All your data will
                be deleted including your balance, bets, and profile.
              </p>
              <div class="space-y-2">
                <label for="keyword" class="font-semibold space-x-2">
                  <span>Enter your name</span>
                  <span class="px-2 py-1 text-green-dark bg-green-100 rounded-md">
                    {{ user.name }}
                  </span>
                  <span>to continue:</span>
                </label>

                <input v-model="keyword" id="keyword" type="text" />
              </div>
            </div>

            <div class="flex flex-col-reverse md:flex-row gap-2 mt-4">
              <button ref="closeBtnElement" @click="closeModal" class="btn-secondary w-full">
                Cancel
              </button>
              <button
                @click="handleConfirm"
                :disabled="keyword !== user.name"
                class="btn-danger w-full"
              >
                Delete account
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
