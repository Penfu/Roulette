<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const open = ref(false);

onMounted(() => {
  window.addEventListener('click', close);
});

onUnmounted(() => {
  window.removeEventListener('click', close);
});

const toggle = () => {
  console.log('toggle');
  open.value = !open.value;
};

const close = (e: any) => {
  if (!e.target.closest('.dropdown')) {
    open.value = false;
  }
};
</script>

<template>
  <div>
    <!-- Dropdown toggle button -->
    <button @click="toggle">
      <slot name="header"></slot>
    </button>

    <!-- Dropdown menu -->
    <div v-show="open" class="absolute right-0 py-2 mt-2 w-44 bg-white rounded border border-gray-300 shadow">
      <slot name="body"></slot>
    </div>
  </div>
</template>
