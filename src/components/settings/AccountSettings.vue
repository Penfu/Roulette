<script setup lang="ts">
import { computed } from "vue";

import ProviderInfo from "@/components/settings/account/ProviderInfo.vue";
import UpdateName from "@/components/settings/account/UpdateName.vue";
import UpdateEmail from "@/components/settings/account/UpdateEmail.vue";
import UpdatePassword from "@/components/settings/account/UpdatePassword.vue";
import DeleteAccount from "@/components/settings/account/DeleteAccount.vue";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

const userCanEdit = computed(() => !auth.user.provider);
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-4xl font-bold">Account Settings</h1>

    <div v-if="auth.loading" class="h-64 w-full rounded-xl bg-gray-200 animate-pulse" />
    <div v-else class="space-y-8 drop-shadow">
      <UpdateName />
      <ProviderInfo />
      <UpdateEmail v-if="userCanEdit" />
      <UpdatePassword v-if="userCanEdit" />
      <DeleteAccount />
    </div>
  </div>
</template>
