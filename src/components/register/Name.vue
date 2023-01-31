<script setup lang="ts">

defineProps<{
  user: {
    name: string;
  };
}>();
</script>

<template>
  <div>
    <label class="block py-2">Name</label>
    <input
      type="text"
      v-model="user.name"
      class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
    />
  </div>
</template>
