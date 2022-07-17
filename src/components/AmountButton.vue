<script lang="ts">
export default {
  props: {
    value: Number,
  },
};
</script>

<template>
  <button
    @click="$emit('add-balance', value)"
    class="h-12 w-32 bg-gray-200 hover:bg-gray-300 font-semibold rounded shadow shadow-gray-300"
  >
    {{ value ?? "All In" }}
  </button>
</template>
