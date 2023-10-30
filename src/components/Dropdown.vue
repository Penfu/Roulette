<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const open = ref(false);

onMounted(() => {
  addEventListener('click', close);
});

onUnmounted(() => {
  removeEventListener('click', close);
});

const toggle = () => {
  open.value = !open.value;
};

const close = (e: any) => {
  if (!e.target.closest('.dropdown')) {
    open.value = false;
  }
};
</script>

<template>
  <div class="relative">
    <!-- Dropdown toggle button -->
    <button @click="toggle" class="w-full dropdown">
      <slot name="trigger"></slot>
    </button>

    <!-- Dropdown menu -->
    <div v-show="open">
      <slot name="content"></slot>
    </div>
  </div>
</template>
