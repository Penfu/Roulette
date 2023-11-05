<script setup lang="ts">
defineProps<{
  user: {
    password: string;
    passwordConfirmation: string;
  };
}>();
</script>

<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <label for="password" class="block">Password</label>
      <input
        v-model="user.password"
        id="password"
        type="password"
        autocomplete="new-password"
        required
        class="bg-bkg-1"
      />
    </div>
    <div class="space-y-2">
      <label for="password_confirmation" class="block">Password Confirmation</label>
      <input
        v-model="user.passwordConfirmation"
        id="password_confirmation"
        type="password"
        autocomplete="new-password"
        required
        class="bg-bkg-1"
      />
    </div>
  </div>
</template>
