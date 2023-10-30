<script setup lang="ts">
import ProviderInfo from "@/components/settings/account/ProviderInfo.vue";
import UpdateName from "@/components/settings/account/UpdateName.vue";
import UpdateEmail from "@/components/settings/account/UpdateEmail.vue";
import UpdatePassword from "@/components/settings/account/UpdatePassword.vue";
import DeleteAccount from "@/components/settings/account/DeleteAccount.vue";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-4xl font-bold">Account Settings</h1>

    <div class="space-y-8 drop-shadow-md">
      <UpdateName />
      <ProviderInfo />
      <UpdateEmail v-show="!auth.user.provider" />
      <UpdatePassword v-show="!auth.user.provider" />
      <DeleteAccount />
    </div>
  </div>
</template>
