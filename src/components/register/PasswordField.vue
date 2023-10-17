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
      <label class="block">Password</label>
      <input
        v-model="user.password"
        type="password"
        autocomplete="new-password"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
      />
    </div>
    <div class="space-y-2">
      <label class="block">Password Confirmation</label>
      <input
        v-model="user.passwordConfirmation"
        type="password"
        autocomplete="new-password"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
      />
    </div>
  </div>
</template>
