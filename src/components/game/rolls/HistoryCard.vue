<script setup lang="ts">
import { classFromColor } from "@/helpers/color";
import type Roll from "@/interfaces/roll";

defineProps<{
  roll: Roll;
}>();
</script>

<template>
  <span
    v-motion
    :initial="{ opacity: 0, x: -100 }"
    :enter="{ opacity: 1, x: 0 }"
    :leave="{ opacity: 0, x: 100 }"

    class="p-5 flex justify-center items-center text-center text-white font-semibold text-xl rounded shadow"
    :class="classFromColor(roll.color)"
  >
    {{ roll.value }}
  </span>
</template>
