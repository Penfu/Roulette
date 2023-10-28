<script setup lang="ts">
defineProps<{
  user: {
    email: string;
  };
}>();
</script>

<template>
  <div class="space-y-2">
    <label class="block">Email</label>
    <input v-model="user.email" type="email" autocomplete="email" required />
  </div>
</template>
