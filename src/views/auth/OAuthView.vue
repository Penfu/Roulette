<script setup lang="ts">
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

const userStore = useAuthStore();

const code = router.currentRoute.value.query.code as string;
await userStore.loginGithubCallback(code);
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">

      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Login with Github</h2>
      </div>
    </div>
  </main>
</template>
