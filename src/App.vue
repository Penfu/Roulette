<script setup lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
</script>

<template>
  <div class="bg-gray-100">
    <div class="mx-auto max-w-[100rem] px-4 flex flex-col min-h-screen">
      <NavBar />

      <RouterView class="z-10 py-4 grow" />
    </div>
  </div>
</template>
