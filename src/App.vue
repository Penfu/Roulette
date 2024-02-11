<script setup lang="ts">
import { inject } from '@vercel/analytics';

import NavBar from '@/components/layout/NavBar.vue';

inject();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <NavBar class="xs:mx-auto xs:max-w-[100rem] xs:px-4 w-full" />
    <RouterView class="grow mx-auto max-w-[100rem] p-4 w-full" />
  </div>
</template>
