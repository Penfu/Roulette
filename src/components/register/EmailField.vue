<script setup lang="ts">
const email = defineModel('email');
</script>

<template>
  <div class="space-y-2">
    <label for="email" class="block">Email</label>
    <input v-model="email" id="email" type="email" autocomplete="email" required />
  </div>
</template>
