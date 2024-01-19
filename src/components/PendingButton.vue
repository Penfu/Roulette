<script setup lang="ts">
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

defineProps<{
  disabled: boolean;
  pending: boolean;
}>();
</script>

<template>
  <button
        :disabled="disabled"
        type="submit"
        class="btn-primary w-full sm:w-auto relative flex justify-center items-center"
      >
        <span :class="{ invisible: pending }">
          <slot>Submit</slot>
        </span>
        <SpinnerIcon v-if="pending" class="absolute" />
      </button>
</template>
