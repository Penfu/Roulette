<script setup lang="ts">
defineProps<{
  user: {
    email: string;
  };
}>();
</script>

<template>
  <div class="space-y-2">
    <label for="email" class="block">Email</label>
    <input
      v-model="user.email"
      id="email"
      type="email"
      autocomplete="email"
      required
      class="bg-gray"
    />
  </div>
</template>
