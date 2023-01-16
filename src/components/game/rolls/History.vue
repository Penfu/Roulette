<script setup lang="ts">
import type Color from "@/enums/color";
import Helper from "@/helpers/color";

const props = defineProps<{
  color: any;
  value: number;
}>();
</script>

<template>
  <div
    class="flex justify-center items-center text-center h-12 w-12 text-white font-semibold text-xl rounded shadow-md"
    :class="Helper.getClassFromColor(color)"
  >
    <label>{{ value }}</label>
  </div>
</template>
