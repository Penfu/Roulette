<script lang="ts">
import Color from "./../enums/Color";
import Helper from "./../helpers/Color";

export default {
  props: {
    color: String,
    value: Number,
  },
  data() {
    return {
      Helper,
      Color,
    };
  },
};
</script>

<template>
  <div
    class="flex justify-center items-center text-center h-12 w-12 bg-red-500 text-white font-semibold text-xl rounded shadow"
    :class="Helper.getClassFromColor(color)"
  >
    <label>{{ value }}</label>
  </div>
</template>
