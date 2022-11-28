<script lang="ts">
export default {
  name: "Step",
  props: {
    step: Number,
    number: Number,
    title: String,
  },
};
</script>

<template>
  <button @click="$emit('set-step')" class="flex items-center space-x-2 group">
    <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-200 text-gray-800" :class="{
      'bg-blue-500': step == number,
      'hover:bg-gray-300': step != number,
    }">
      <span :class="{ 'text-white': step == number }">
        {{ number }}
      </span>
    </div>
    <span class="text-gray-600" :class="{
      'text-black': step == number,
      'group-hover:text-black': step != number
    }">{{ title }}</span>
  </button>
</template>
