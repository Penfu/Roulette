<script setup lang="ts">
import getClassFromColor from "@/helpers/color";
import type Roll from "@/models/roll";

defineProps<{
  roll: Roll;
}>();
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -100 }"
    :enter="{ opacity: 1, x: 0 }"
    :leave="{ opacity: 0, x: 100 }"

    class="flex justify-center items-center text-center h-12 w-12 text-white font-semibold text-xl rounded shadow-md"
    :class="getClassFromColor(roll.color)"
  >
    <label>{{ roll.value }}</label>
  </div>
</template>
