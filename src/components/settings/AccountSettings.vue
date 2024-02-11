<script setup lang="ts">
import { computed } from 'vue';

import UpdateName from '@/components/settings/account/UpdateName.vue';
import UpdateAvatar from '@/components/settings/account/UpdateAvatar.vue';
import UpdateProvider from '@/components/settings/account/UpdateProvider.vue';
import UpdateEmail from '@/components/settings/account/UpdateEmail.vue';
import UpdatePassword from '@/components/settings/account/UpdatePassword.vue';
import DeleteAccount from '@/components/settings/account/DeleteAccount.vue';

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();

const userCanEdit = computed(() => !auth.user.provider);
</script>

<template>
  <div class="space-y-5">
    <h2>Account Settings</h2>

    <div v-if="auth.loading" class="h-64 w-full bg-gray-200 rounded-lg animate-pulse" />
    <div v-else class="space-y-8">
      <UpdateName />
      <UpdateAvatar />
      <UpdateProvider />
      <UpdateEmail v-if="userCanEdit" />
      <UpdatePassword v-if="userCanEdit" />
      <DeleteAccount />
    </div>
  </div>
</template>
