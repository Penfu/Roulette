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
      class="flex items-center justify-center w-12 h-12 md:w-10 md:h-10 rounded-lg text-gray-800 shadow"
      :class="[
        { [hasError ? 'bg-red-500 shadow-gray-500' : 'bg-blue-500 shadow-gray-300']: isActive },
        { [hasError ? 'bg-red-200 shadow-red-500' : 'bg-gray-200 shadow-gray-300']: !isActive },
        { [hasError ? 'hover:bg-red-300' : 'hover:bg-gray-300']: !isActive },
      ]"
    >
      <span class="text-lg font-semibold" :class="{ 'text-white': isActive }">
        {{ index + 1 }}
      </span>
    </div>
    <span
      class="hidden md:block text-md text-gray-600"
      :class="isActive ? 'text-black' : 'group-hover:text-black'"
    >
      {{ name }}
    </span>
  </button>
</template>
