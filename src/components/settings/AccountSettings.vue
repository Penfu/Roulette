<script setup lang="ts">
import UpdateName from "@/components/settings/account/UpdateName.vue";
import UpdateEmail from "@/components/settings/account/UpdateEmail.vue";
</script>

<template>
  <div class="space-y-5">
    <h1 class="text-4xl font-bold">Account Settings</h1>

    <div class="space-y-8 drop-shadow-md">
      <UpdateName />
      <UpdateEmail />
    </div>
  </div>
</template>
