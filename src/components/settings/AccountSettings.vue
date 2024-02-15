<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/auth';

import UpdateName from '@/components/settings/account/UpdateName.vue';
import UpdateAvatar from '@/components/settings/account/UpdateAvatar.vue';
import UpdateProvider from '@/components/settings/account/UpdateProvider.vue';
import UpdateEmail from '@/components/settings/account/UpdateEmail.vue';
import UpdatePassword from '@/components/settings/account/UpdatePassword.vue';
import DeleteAccount from '@/components/settings/account/DeleteAccount.vue';


const auth = useAuthStore();
const { user } = storeToRefs(auth);
</script>

<template>
  <div class="space-y-5">
    <h2>Account Settings</h2>

    <div v-if="user === null" class="h-64 w-full bg-gray-200 rounded-lg animate-pulse" />
    <div v-else class="space-y-8">
      <UpdateName />
      <UpdateAvatar />
      <UpdateProvider />
      <UpdateEmail v-if="user.provider === null" />
      <UpdatePassword v-if="user.provider === null" />
      <DeleteAccount />
    </div>
  </div>
</template>
