<script setup lang="ts">
import Helper from "@/helpers/color";
import type Roll from "@/models/roll";

defineProps<{
  roll: Roll;
}>();
</script>

<template>
  <div
    class="flex justify-center items-center text-center h-12 w-12 text-white font-semibold text-xl rounded shadow-md"
    :class="Helper.getClassFromColor(roll.color)"
  >
    <label>{{ roll.value }}</label>
  </div>
</template>
