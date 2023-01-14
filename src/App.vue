<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useUserStore } from "./stores/user";

import {
  CubeIcon,
  TrophyIcon,
  BanknotesIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import OpenSidebarIcon from "./components/icons/OpenSidebarIcon.vue";
import CloseSidebarIcon from "./components/icons/CloseSidebarIcon.vue";
import Dropdown from "./components/Dropdown.vue";

const sideBarIsOpen = ref(false);

const auth = useUserStore();
</script>

<template>
  <div class="px-4 min-h-screen flex flex-col sm:flex-row sm:gap-4 bg-gray-100">
    <!-- Nav -->
    <!-- Sidebar -->
    <aside class="z-20 sm:py-4 sticky top-0 sm:h-screen rounded-b-lg">
      <div
        class="py-4 px-2 sm:py-2 sm:w-24 sm:h-full flex flex-row sm:flex-col justify-center items-center gap-4 overflow-hidden text-gray-700 bg-white rounded-b-lg sm:rounded-lg shadow shadow-gray-300 transition-width transition-slowest duration-500 ease"
        :class="{ 'lg:w-44': sideBarIsOpen }">
        <div class="lg:py-4 my-2 px-4 sm:w-full flex" :class="{ 'flex-col-reverse': !sideBarIsOpen }">
          <!-- Title -->
          <RouterLink to="/" class="sm:w-full flex justify-center items-center space-x-2 text-lg"
            :class="{ 'lg:my-6': !sideBarIsOpen }">
            <CubeIcon class="w-6 h-6" />
            <span class="hidden text-lg font-bold" :class="{ 'lg:block': sideBarIsOpen }">Roll</span>
          </RouterLink>

          <!-- Toggle button -->
          <button class="px-2 hidden lg:block space-x-2 rounded group" @click="sideBarIsOpen = !sideBarIsOpen">
            <OpenSidebarIcon v-if="!sideBarIsOpen" class="w-7 h-7 text-gray-600 group-hover:text-gray-800" />
            <CloseSidebarIcon v-else class="w-7 h-7 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        <!-- Links -->
        <div class="grow w-full">
          <div
            class="px-4 sm:px-0 sm:pt-8 w-full flex flex-row sm:flex-col sm:justify-center lg:justify-left items-center space-x-4 sm:space-x-0 sm:space-y-8 border-l sm:border-l-0 sm:border-t border-gray-300">
            <RouterLink to="/leaderboard"
              class="p-3 sm:w-full flex justify-center items-center text-lg hover:bg-gray-200 rounded">
              <TrophyIcon class="lg:mx-2 w-6 h-6" />
              <span class="hidden grow font-medium" :class="{ 'lg:block': sideBarIsOpen }">Leaderboard</span>
            </RouterLink>
          </div>
        </div>

        <!-- Bottom -->
        <div class="w-auto sm:w-full">
          <!-- Balance -->
          <label v-show="auth.isAuth"
            class="hidden my-4 px-4 py-2 items-center justify-center space-x-2 bg-white border border-gray-300 shadow-sm rounded"
            :class="{ 'lg:flex': sideBarIsOpen }">
            <BanknotesIcon class="h-6 w-6 text-green-500" />
            <span>{{ auth.user.balance }}</span>
          </label>

          <!-- User Profile -->
          <Dropdown v-if="auth.isAuth">
            <template #trigger>
              <div
                class="p-3 sm:w-full flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded">
                <UserIcon class="w-6 h-6" />
                <span class="hidden font-medium" :class="{ 'lg:block': sideBarIsOpen }">
                  {{ auth.user.name }}</span>
              </div>
            </template>
            <template #content>
              <div
                class="z-20 absolute right-0 sm:left-44 mt-2 sm:mt-0 sm:bottom-0 py-4 flex flex-col justify-end items-center transition-all transition-slowest duration-500 ease"
                :class="{ 'lg:left-64': sideBarIsOpen }">
                <div class="w-36 bg-white rounded-lg shadow shadow-gray-300 drop-shadow">
                  <div class="m-2 flex flex-col">
                    <RouterLink :to="'/profile/' + auth.user.name" class="py-2 hover:bg-gray-200 rounded text-left">
                      <span class="ml-4">Profile</span>
                    </RouterLink>
                    <button @click="auth.logout" class="py-2 hover:bg-red-500 hover:text-white rounded text-left">
                      <span class="ml-4">Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </Dropdown>

          <!-- Login btn -->
          <RouterLink v-else to="/login"
            class="p-3 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded">
            <ArrowRightOnRectangleIcon class="w-6 h-6" />
            <span class="hidden font-medium" :class="{ 'lg:block': sideBarIsOpen }">Login</span>
          </RouterLink>
        </div>
      </div>
    </aside>

    <!-- Content -->
    <RouterView class="z-10 py-4 grow" />
  </div>
</template>
