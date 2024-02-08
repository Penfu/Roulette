<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import axios from "@/axios.config";

import { useAuthStore } from "@/stores/auth";

import PendingButton from "@/components/PendingButton.vue";

const auth = useAuthStore();

const { isPending, mutate } = useMutation({
  mutationFn: () => axios.delete("/users/me/provider"),
  onSuccess: () => {
    auth.logout();
  },
});
</script>

<template>
  <section class="space-y-4">
    <h4>Provider</h4>

    <div v-if="auth.user.provider" class="space-y-6">
      <p>
        You are logged in with
        <span class="px-2 py-1 capitalize font-semibold text-white bg-black rounded-md">
          {{ auth.user.provider }}</span
        >. Your account is linked so you can't change your email or password.
      </p>

      <p>
        You can unlink your account from this provider and will receive your credentials by email at
        <span class="text-green font-semibold">{{ auth.user.email }}</span
        >. Then login with them and you will be able to change your email and password in your
        settings.
      </p>

      <p class="italic">
        You can re-link your account to a provider at any time by connecting via a provider account
        with the same email address as below.
      </p>
      <PendingButton
        @click="mutate"
        type="button"
        :disabled="isPending"
        :pending="isPending"
        class="btn-danger w-full sm:w-auto"
      >
        Unlink provider
      </PendingButton>
    </div>
    <div v-else class="space-y-6">
      <p>
        You can link your account with
        <span class="px-2 py-1 capitalize font-semibold text-white bg-black rounded-md">
          Github
        </span>
        &nbsp;or
        <span class="px-2 py-1 capitalize font-semibold text-white bg-black rounded-md">
          Google
        </span>
        &nbsp;to login with them.
      </p>
      <p>
        To link your account you need to sign out then login with a provider account which has your
        email address
        <span class="text-green font-semibold">{{ auth.user.email }}</span
        >. If you want to login with a provider account which has a different email, you can change
        your email here to match.
      </p>
      <p class="italic">
        You can unlink your account from a provider at any time. Linking or unlinking your account
        will conserve all your data !
      </p>
    </div>
  </section>
</template>
