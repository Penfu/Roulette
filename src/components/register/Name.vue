<script setup lang="ts">

defineProps<{
  user: {
    name: string;
  };
  errors: {
    name: string[];
  }
}>();
</script>

<template>
  <div class="py-2 space-y-2">
    <label class="block text-red-500">{{ errors.name[0] }}</label>
    <label class="block">Name</label>
    <input
      type="text"
      v-model="user.name"
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
