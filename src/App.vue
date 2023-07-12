<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
</script>

<template>
  <div class="bg-gray-100">
    <div class="px-4 min-h-screen flex flex-col sm:flex-row sm:gap-4">
      <NavBar />

      <RouterView class="z-10 py-4 grow" />
    </div>
  </div>
</template>
