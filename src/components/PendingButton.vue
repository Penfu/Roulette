<script setup lang="ts">
import SpinnerIcon from '@/components/icons/SpinnerIcon.vue';

defineProps<{
  pending: boolean;
}>();
</script>

<template>
  <button :disabled="pending" class="relative flex justify-center items-center">
    <span :class="{ invisible: pending }">
      <slot>Submit</slot>
    </span>
    <SpinnerIcon v-if="pending" class="absolute" />
  </button>
</template>
