<script setup lang="ts">

const props = defineProps<{
  value?: number;
}>();

const emit = defineEmits<{
  (e: 'addBalance', value: number): void;
}>();
</script>

<template>
  <button
    @click="emit('addBalance', props.value ?? 0)"
    class="h-12 w-full lg:w-32 bg-gray-100 hover:bg-gray-300 font-semibold rounded shadow shadow-gray-300"
  >
    {{ value ?? "All In" }}
  </button>
</template>
