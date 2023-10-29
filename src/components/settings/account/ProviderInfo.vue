<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="px-4 sm:px-8 py-3 sm:py-6 bg-white rounded-lg space-y-4">
    <h2 class="text-xl font-semibold">Provider</h2>

    <div class="space-y-6">
      <span class="block">
        You are logged in with
        <span class="px-2 py-1 capitalize font-semibold text-white bg-gray-800 rounded-md">{{ auth.user.provider }}</span>.
        Your account is linked so you can't change your email or password.
      </span>
    </div>
  </div>
</template>
