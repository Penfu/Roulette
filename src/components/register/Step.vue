<script setup lang="ts">

defineProps<{
  index: number;
  title: string;
  isActive: boolean;
}>();

</script>

<template>
  <button @click="$emit('set-step')" class="flex items-center space-x-2 group">
    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-800"
      :class="isActive ? 'bg-blue-500' : 'hover:bg-gray-300'">
      <span :class="{ 'text-white': isActive }">
        {{ index + 1 }}
      </span>
    </div>
    <span class="text-gray-600" :class="isActive ? 'text-black' : 'group-hover:text-black'">
      {{ title }}
    </span>
  </button>
</template>
