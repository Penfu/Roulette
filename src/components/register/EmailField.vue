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
    <input
      v-model="user.email"
      type="email"
      autocomplete="email"
      required
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
