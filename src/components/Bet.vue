<script lang="ts">
export default {
  name: "Bet",
  props: {
    name: String,
    color: String,
    value: Number,
  },
};
</script>

<template>
  <div class="py-1 px-4 flex bg-gray-200 rounded shadow shadow-gray-300">
    <label class="grow">{{ name }}</label>
    <label>{{ value }}</label>
  </div>
</template>
