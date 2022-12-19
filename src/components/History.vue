<script setup lang="ts">
import type Color from "./../enums/Color";
import Helper from "./../helpers/Color";

const props = defineProps<{
  color: any;
  value: number;
}>();
</script>

<template>
  <div
    class="flex justify-center items-center text-center h-12 w-12 bg-red-500 text-white font-semibold text-xl rounded shadow"
    :class="Helper.getClassFromColor(color)"
  >
    <label>{{ value }}</label>
  </div>
</template>
