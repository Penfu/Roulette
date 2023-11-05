<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    @click="toggleDark()"
    aria-label="Toggle Dark Mode"
    class="btn p-3 flex justify-center items-center bg-gray-200 hover:bg-gray-300"
  >
    <MoonIcon v-if="isDark" class="w-6 h-6" />
    <SunIcon v-else class="w-6 h-6" />
  </button>
</template>
