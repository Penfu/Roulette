<script setup lang="ts">
import { ref } from "vue";
import { breakpointsTailwind, useBreakpoints, useConfirmDialog } from "@vueuse/core";
import { useMotions } from "@vueuse/motion";

import { useAuthStore } from "@/stores/auth";

import { useUserSettings } from "@/composables/useUserSettings";

const auth = useAuthStore();

const { error, deleteAccount } = useUserSettings();

const { isRevealed, reveal, confirm, cancel, onReveal } = useConfirmDialog();
const keyword = ref("");

const breakpoints = useBreakpoints(breakpointsTailwind);
const sm = breakpoints.smaller("sm");
const motions = useMotions();
const transition = { type: "spring", stiffness: 250, damping: 25, mass: 0.5 };

onReveal(() => {
  error.value = null;
  keyword.value = "";
});

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
  <div class="px-4 sm:px-8 py-3 sm:py-6 bg-red-100 rounded-lg border-2 border-red-600 space-y-4">
    <div class="space-y-2">
      <h2 class="text-xl font-semibold">Delete your account</h2>
      <p>
        <span class="text-red-600 font-semibold">
          This action is irreversible. All your data will be lost.
        </span>
        <span>You’ll get a chance to confirm your choice.</span>
      </p>
    </div>

    <button @click="reveal" type="button" class="btn-danger w-full sm:w-auto md:w-full lg:w-auto">
      Delete account
    </button>

    <teleport to="body">
      <transition :css="false" @leave="(_: any, done: any) => motions.transition.leave(done)">
        <div
          v-if="isRevealed"
          @click="cancel"
          class="z-50 fixed inset-0 bg-black bg-opacity-80 backdrop-blur-[3px] flex justify-center items-end sm:items-center"
        >
          <!-- set slide-bottom animation on mobile and pop on larger screen -->
          <div
            @click.stop
            v-motion="'transition'"
            :initial="sm ? { opacity: 0, y: 600 } : { opacity: 0.75, scale: 0.8 }"
            :enter="sm ? { opacity: 1, y: 0, transition } : { opacity: 1, scale: 1, transition }"
            :leave="
              sm ? { opacity: 0, y: 600, transition } : { opacity: 0, scale: 0.8, transition }
            "
            class="sm:mx-8 px-6 py-8 md:px-8 md:py-10 max-w-2xl w-full bg-white rounded-t-3xl sm:rounded-lg space-y-12"
          >
            <div class="space-y-8">
              <h2 class="text-3xl font-bold">You're about to delete your account</h2>

              <p v-if="error" class="text-red-500">{{ error }}</p>

              <p class="text-gray-700">
                This is <span class="text-red-500 font-semibold">irreversible</span>. All your data
                will be deleted including your balance, bets, and profile.
              </p>

              <div class="space-y-2">
                <label for="keyword" class="font-semibold"
                  >Enter your name
                  <span class="px-2 py-1 font-bold text-green-400 bg-green-100 rounded-lg">{{
                    auth.user.name
                  }}</span>
                  to continue:
                </label>
                <input v-model="keyword" id="password" type="text" />
              </div>
            </div>

            <div class="flex flex-col-reverse md:flex-row gap-2 mt-4">
              <button @click="cancel" class="btn-secondary w-full">Cancel</button>
              <button @click="handleConfirm" :disabled="!keyword" class="btn-danger w-full">
                Delete account
              </button>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
