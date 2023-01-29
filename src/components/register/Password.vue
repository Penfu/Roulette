<script setup lang="ts">

defineProps<{
  user: {
    password: string;
    password_confirmation: string;
  };
}>();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div>
      <label class="block py-2">Password</label>
      <input type="password" v-model="user.password" class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
    </div>
    <div>
      <label class="block py-2">Password Confirmation</label>
      <input type="password" v-model="user.password_confirmation"
        class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg" />
    </div>
  </div>
</template>
