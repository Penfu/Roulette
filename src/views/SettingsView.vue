<script setup lang="ts">
import AccountSettings from "@/components/settings/AccountSettings.vue";
import GameSettings from "@/components/settings/GameSettings.vue";

defineProps<{
  tab: string,
}>();
</script>

<template>
  <main class="my-4 flex flex-col lg:flex-row gap-10 md:gap-12 lg:gap-14">
    <!-- Navigation -->
    <aside class="section w-auto md:w-96 h-min flex flex-col xs:flex-row md:flex-col justify-center gap-x-8 gap-y-3 text-lg md:text-left whitespace-nowrap">
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
