<script setup lang="ts">

defineProps<{
  name: string;
  value: number;
}>();
</script>

<template>
  <div class="py-1 px-4 flex bg-gray-200 rounded shadow shadow-gray-300">
    <label class="grow">{{ name }}</label>
    <label>{{ value }}</label>
  </div>
</template>
