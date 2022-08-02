<script lang="ts">
export default {
  props: {
    color: String,
    value: Number,
  },
};
</script>

<template>
  <div
    class="flex justify-center items-center text-center h-12 w-12 bg-red-500 text-white font-semibold text-xl rounded shadow"
    :class="{
    'bg-red-500 shadow-red-300': color == 'red',
    'bg-green-500 shadow-green-300': color == 'green',
    'bg-gray-900 shadow-gray-500': color == 'black'
  }">
    <label>{{ value }}</label>
  </div>
</template>
