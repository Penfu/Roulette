<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="flex flex-col xs:flex-row justify-center items-center gap-4 xs:gap-6">
    <span class="opacity-70">© Penfu. {{ year }}</span>
    <RouterLink to="/privacy" class="opacity-70 hover:opacity-100 transition-opacity duration-200">Privacy</RouterLink>
    <RouterLink to="/terms" class="opacity-70 hover:opacity-100 transition-opacity duration-200">Terms</RouterLink>
  </footer>
</template>
