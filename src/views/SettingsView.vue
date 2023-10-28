<script setup lang="ts">
import AccountSettings from "@/components/settings/AccountSettings.vue";
import GameSettings from "@/components/settings/GameSettings.vue";

defineProps({
  tab: { type: String },
});
</script>

<template>
  <main class="my-4 flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-14">
    <!-- Navigation -->
    <aside class="w-auto md:w-96 h-min px-4 sm:px-8 py-3 md:py-6 flex flex-col xs:flex-row md:flex-col justify-center gap-x-8 gap-y-3 bg-white text-lg md:text-left rounded-lg whitespace-nowrap drop-shadow-md">
      <router-link to="/settings" active-class="font-bold">
        Account settings
      </router-link>
      <router-link to="/settings/game" active-class="font-bold">
        Game preferences
      </router-link>
    </aside>

    <!-- Content -->
    <div class="w-full">
      <GameSettings v-if="tab === 'game'" />
      <AccountSettings v-else />
    </div>
  </main>
</template>
