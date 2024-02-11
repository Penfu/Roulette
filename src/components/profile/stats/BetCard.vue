<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  stats: string | number;
  label: string;
}>();
</script>

<template>
  <div
    class="w-full py-2 flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow shadow-gray-300"
  >
    <span class="text-xl md:text-2xl font-bold">{{ stats }}</span>
    <span class="text-lg md:text-xl text-gray-700">{{ label }}</span>
  </div>
</template>
