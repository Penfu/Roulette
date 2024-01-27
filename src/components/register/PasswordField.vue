<script setup lang="ts">
const password = defineModel('password');
const passwordConfirmation = defineModel('passwordConfirmation');
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <label for="password" class="block">Password</label>
      <input
        v-model="password"
        id="password"
        type="password"
        autocomplete="new-password"
        required
      />
    </div>
    <div class="space-y-2">
      <label for="password_confirmation" class="block">Password Confirmation</label>
      <input
        v-model="passwordConfirmation"
        id="password_confirmation"
        type="password"
        autocomplete="new-password"
        required
      />
    </div>
  </div>
</template>
