<script setup lang="ts">
defineProps<{
  user: {
    name: string;
  };
}>();
</script>

<template>
  <div class="space-y-2">
    <label for="name" class="block">Name</label>
    <input
      v-model="user.name"
      id="name"
      type="text"
      autocomplete="username"
      required
      class="bg-bkg-1"
    />
  </div>
</template>
