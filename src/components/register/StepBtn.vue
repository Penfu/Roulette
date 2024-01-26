<script setup lang="ts">
defineProps<{
  index: number;
  name: string;
  selected: boolean;
  hasError: boolean;
}>();
</script>

<template>
  <button type="button" class="flex items-center space-x-2 focus:outline-none">
    <span
      class="w-12 h-12 flex items-center justify-center text-lg font-semibold rounded-lg shadow shadow-gray-300"
      :class="[
        { [hasError ? 'bg-red' : 'bg-green']: selected },
        { [hasError ? 'bg-red-light hover:bg-red bg-opacity-80 shadow-red' : 'bg-gray-200 hover:bg-gray-300']: !selected },
        { 'text-white dark:text-black': selected },
      ]"
    >
      {{ index + 1 }}
    </span>
    <span class="hidden md:block text-md text-gray-700">
      {{ name }}
    </span>
  </button>
</template>
