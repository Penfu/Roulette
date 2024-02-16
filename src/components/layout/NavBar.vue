<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

import { HomeIcon, TrophyIcon, BanknotesIcon } from '@heroicons/vue/24/outline';

import DarkModeSwitch from '@/components/layout/DarkModeSwitch.vue';
import UserDropdownMenu from '@/components/layout/UserDropdownMenu.vue';

const auth = useAuthStore();
</script>

<template>
  <div>
    <nav
      class="h-16 px-4 flex flex-row justify-center items-center gap-4 text-gray-700 bg-gray xs:rounded-b-lg shadow shadow-gray-300"
    >
      <!-- Title -->
      <RouterLink to="/" class="flex justify-center items-center gap-x-2 text-lg">
        <HomeIcon class="md:hidden w-6 h-6" />
        <h1 class="hidden md:block px-2 text-2xl font-bold uppercase">Roll</h1>
      </RouterLink>

      <!-- Links -->
      <div class="grow w-full">
        <div class="px-4 w-full flex flex-row items-center space-x-4 text-lg font-medium border-l border-gray-300">
          <RouterLink
            to="/leaderboard"
            class="p-2 flex justify-center items-center gap-x-2 text-lg hover:bg-gray-200 rounded"
          >
            <TrophyIcon class="md:hidden w-6 h-6" />
            <span class="hidden md:block">Leaderboard</span>
          </RouterLink>
        </div>
      </div>

      <!-- User Info / Actions -->
      <div class="flex items-center gap-2 md:gap-4">
        <!-- Balance -->
        <span v-show="auth.user" class="hidden sm:flex p-2 justify-center items-center gap-2">
          <BanknotesIcon class="h-6 w-6 text-green" />
          <span class="text-lg">{{ auth.user?.balance }}</span>
        </span>

        <DarkModeSwitch />
        
        <UserDropdownMenu v-if="auth.user" />
        <RouterLink v-else to="/login" class="btn text-base bg-gray-200 hover:bg-gray-300">Login</RouterLink>
      </div>
    </nav>
  </div>
</template>
