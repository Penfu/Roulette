<script setup lang="ts">
defineProps<{
  user: {
    name: string;
  };
}>();
</script>

<template>
  <div class="space-y-2">
    <label class="block">Name</label>
    <input
      v-model="user.name"
      type="text"
      autocomplete="username"
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
