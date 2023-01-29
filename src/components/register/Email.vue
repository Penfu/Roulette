<script setup lang="ts">

defineProps<{
  user: {
    email: string;
  };
}>();
</script>

<template>
  <div>
    <label class="block py-2">Email</label>
    <input
      type="email"
      v-model="user.email"
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
