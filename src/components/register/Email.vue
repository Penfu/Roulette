<script setup lang="ts">

defineProps<{
  user: {
    email: string;
  };
  errors: {
    email: string[];
  }
}>();
</script>

<template>
  <div class="py-2 space-y-2">
    <label class="block text-red-500">{{ errors.email[0] }}</label>
    <label class="block">Email</label>
    <input type="email" v-model="user.email" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
  </div>
</template>
