<script setup lang="ts">
import { ref } from "vue";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";
import { breakpointsTailwind, useBreakpoints, useConfirmDialog } from "@vueuse/core";
import { useMotions } from "@vueuse/motion";

import { useAuthStore } from "@/stores/auth";

import { useUserSettings } from "@/composables/useUserSettings";

const auth = useAuthStore();
const { error, deleteAccount } = useUserSettings();

const isOpen = ref(false);
const keyword = ref("");

const breakpoints = useBreakpoints(breakpointsTailwind);
const sm = breakpoints.smaller("sm");
const motions = useMotions();
const transition = { type: "spring", stiffness: 250, damping: 25, mass: 0.5 };

const closeModal = () => {
  isOpen.value = false;
};
const openModal = () => {
  error.value = null;
  keyword.value = "";

  isOpen.value = true;
};

const handleCancel = () => {
  closeModal();
};

const handleConfirm = async () => {
  await deleteAccount(keyword.value);

  if (error.value) {
    keyword.value = "";
    return;
  }

  confirm();
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
      class="btn-danger w-full sm:w-auto md:w-full lg:w-auto"
    >
      Delete account
    </button>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild>
        <div class="fixed inset-0 bg-black/50" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div class="min-h-full flex justify-center items-end sm:items-center">
          <TransitionChild
            :css="false"
            @leave="(_: any, done: any) => motions.transition.leave(done)"
          >
            <DialogPanel
              v-motion="'transition'"
              :initial="sm ? { opacity: 0, y: 600 } : { opacity: 0.75, scale: 0.8 }"
              :enter="sm ? { opacity: 1, y: 0, transition } : { opacity: 1, scale: 1, transition }"
              :leave="
                sm ? { opacity: 0, y: 600, transition } : { opacity: 0, scale: 0.8, transition }
              "
              class="sm:mx-8 px-6 py-8 md:px-8 md:py-10 max-w-2xl w-full bg-bkg-1 rounded-t-3xl sm:rounded-lg space-y-12"
            >
              <DialogTitle as="h2" class="text-3xl font-bold">
                You're about to delete your account
              </DialogTitle>

              <div class="space-y-8">
                <p v-if="error" class="text-red">{{ error }}</p>
                <p class="text-gray-700">
                  This is <span class="text-red font-semibold">irreversible</span>. All your data
                  will be deleted including your balance, bets, and profile.
                </p>
                <div class="space-y-2">
                  <label for="keyword" class="font-semibold space-x-2">
                    <span>Enter your name</span>
                    <span class="px-2 py-1 text-green-dark bg-green-100 rounded-md">
                      {{ auth.user.name }}
                    </span>
                    <span>to continue:</span>
                  </label>

                  <input v-model="keyword" id="keyword" type="text" />
                </div>
              </div>

              <div class="flex flex-col-reverse md:flex-row gap-2 mt-4">
                <button @click="handleCancel" class="btn-secondary w-full">Cancel</button>
                <button
                  @click="handleConfirm"
                  :disabled="keyword !== auth.user.name"
                  class="btn-danger w-full"
                >
                  Delete account
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
