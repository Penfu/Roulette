<script setup lang="ts">

defineProps<{
  user: {
    username: string;
  };
}>();
</script>

<template>
  <div>
    <label class="block py-2">Username</label>
    <input
      type="text"
      v-model="user.username"
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
