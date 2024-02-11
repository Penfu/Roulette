<script setup lang="ts">
const name = defineModel('name');
</script>

<template>
  <div class="space-y-2">
    <label for="name" class="block">Name</label>
    <input v-model="name" id="name" type="text" autocomplete="username" required />
  </div>
</template>
