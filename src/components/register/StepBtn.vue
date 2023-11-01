<script setup lang="ts">
defineProps<{
  index: number;
  name: string;
  isActive: boolean;
  hasError: boolean;
}>();
</script>

<template>
  <button type="button" @click="$emit('set-step')" class="flex items-center space-x-2 group">
    <div
      class="group flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-lg text-black shadow"
      :class="[
        { [hasError ? 'bg-red shadow-gray-500' : 'bg-green shadow-gray-300']: isActive },
        { [hasError ? 'bg-red-200 shadow-red' : 'bg-gray-200 shadow-gray-300']: !isActive },
        { [hasError ? 'hover:bg-red-300' : 'hover:bg-gray-300']: !isActive },
      ]"
    >
      <span class="text-lg font-semibold" :class="{ 'text-white': isActive }">
        {{ index + 1 }}
      </span>
    </div>
    <span class="group hidden md:block text-md text-gray-700">
      {{ name }}
    </span>
  </button>
</template>
