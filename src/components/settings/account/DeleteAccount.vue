<script setup lang="ts">
import { ref, computed } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import axios from "@/axios.config";

import { useAuthStore } from "@/stores/auth";

import PendingButton from "@/components/PendingButton.vue";

const auth = useAuthStore();

const closeBtnElement = ref(null);
const isOpen = ref(false);
const keyword = ref("");

const { isPending, isSuccess, isError, error, mutate } = useMutation({
  mutationFn: () => axios.delete("/users/me", { data: { keyword: keyword.value } }),
  onError: () => {
    keyword.value = "";
  },
  onSuccess: () => {
    closeModal();
    auth.logout();
  },
});

const canSubmit = computed(() => keyword.value === auth.user.name);
const canCancel = computed(() => !isPending.value && !isSuccess.value);

const openModal = () => {
  if (error.value?.message) {
    error.value.message = "";
  }

  keyword.value = "";
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};
</script>

<template>
  <div
    class="px-4 sm:px-8 py-3 sm:py-6 bg-red-100 dark:bg-opacity-90 rounded-lg border-3 border-red-dark space-y-4"
  >
    <div class="space-y-2">
      <h2 class="text-xl text-black font-semibold">Delete your account</h2>
      <p>
        <span class="text-red-dark font-semibold">
          This action is irreversible. All your data will be lost.
        </span>
        <span class="dark:text-black">You'll get a chance to confirm your choice.</span>
      </p>
    </div>

    <button @click="openModal" type="button" class="btn-danger w-full sm:w-auto">
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
            class="sm:mx-8 px-6 py-8 md:px-8 md:py-10 max-w-2xl w-full bg-gray rounded-t-3xl sm:rounded-lg space-y-12"
          >
            <DialogTitle as="h2" class="text-3xl font-bold">
              You're about to delete your account
            </DialogTitle>

            <div class="space-y-8">
              <p v-if="isError" class="text-red">{{ error?.message }}</p>
              <p class="text-gray-700">
                This is <span class="text-red font-semibold">irreversible</span>. All your data will
                be deleted including your balance, bets, and profile.
              </p>
              <div class="space-y-2">
                <label for="keyword" class="font-semibold space-x-2">
                  <span>Enter your name</span>
                  <span class="px-2 py-1 text-green-dark bg-green-100 rounded-md select-all">
                    {{ auth.user.name }}
                  </span>
                  <span>to continue:</span>
                </label>

                <input v-model="keyword" id="keyword" type="text" />
              </div>
            </div>

            <div class="mt-4 flex flex-col-reverse md:flex-row md:justify-end gap-2">
              <button
                ref="closeBtnElement"
                @click="closeModal"
                type="button"
                :disabled="!canCancel"
                class="btn-secondary w-full md:w-1/2"
                :class="{ 'md:hidden': !canCancel }"
              >
                Cancel
              </button>

              <PendingButton
                @click="mutate"
                type="button"
                :disabled="!canSubmit"
                :pending="isPending"
                class="btn-danger w-full md:transition-width md:duration-200 md:ease-in-out"
                :class="[canCancel ? 'md:w-1/2' : 'md:w-full']"
              >
                Delete
              </PendingButton>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
