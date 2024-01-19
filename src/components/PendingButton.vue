<script setup lang="ts">
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

defineProps<{
  disabled?: boolean;
  pending: boolean;
  action?: () => void;
  type?: string;
  classes?: string;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    :type="action ? 'button' : 'submit'"
    class="relative flex justify-center items-center"
    :class="[type ?? 'btn-primary']"
    @click="action?.()"
  >
    <span :class="{ invisible: pending }">
      <slot>Submit</slot>
    </span>
    <SpinnerIcon v-if="pending" class="absolute" />
  </button>
</template>
