<script setup lang="ts">

defineProps<{
  user: {
    password: string;
    passwordConfirmation: string;
  };
  errors: {
    password: string[];
  }
}>();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="py-2 space-y-2">
      <label class="block text-red-500">{{ errors.password[0] }}</label>
      <label class="block">Password</label>
      <input type="password" v-model="user.password"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
    </div>
    <div>
      <label class="block py-2">Password Confirmation</label>
      <input type="password" v-model="user.passwordConfirmation"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
    </div>
  </div>
</template>
