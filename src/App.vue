<script lang="ts">
import { ref } from "vue";
import { useUserStore } from "./stores/user";

import {
  HomeIcon,
  RectangleStackIcon,
  BanknotesIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/vue/24/outline";
import OpenSidebarIcon from "./components/icons/OpenSidebarIcon.vue";
import CloseSidebarIcon from "./components/icons/CloseSidebarIcon.vue";

export default {
  name: "App",
  components: {
    HomeIcon,
    RectangleStackIcon,
    BanknotesIcon,
    ArrowRightOnRectangleIcon,
    OpenSidebarIcon,
    CloseSidebarIcon,
  },
  watch: {
    $route() {},
  },
  setup() {
    let showSideBar = ref(false);
    const toggleSideBar = () => (showSideBar.value = !showSideBar.value);
    return { showSideBar, toggleSideBar };
  },
  data() {
    return {
      auth: useUserStore(),
    };
  },
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col sm:flex-row space-y-4 sm:space-y-0 bg-gray-100"
  >
    <!-- Sidebar -->
    <aside
      class="px-4 py-4 sticky top-0 sm:h-screen bg-gray-100"
      :class="{ 'lg:w-56': showSideBar }"
    >
      <div
        class="py-4 px-2 sm:py-2 w-full h-full flex flex-row sm:flex-col justify-center items-center space-x-4 sm:space-x-0 overflow-hidden text-gray-700 bg-white rounded-lg shadow shadow-gray-300"
      >
        <div
          class="lg:py-4 my-2 px-4 sm:w-full flex"
          :class="{ 'flex-col-reverse': !showSideBar }"
        >
          <!-- Title -->
          <RouterLink
            to="/"
            class="sm:w-full flex justify-center items-center space-x-2 text-lg"
            :class="{ 'lg:my-6': !showSideBar }"
          >
            <svg
              class="w-6 h-6 sm:w-8 sm:h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
              />
            </svg>
            <span
              class="hidden text-lg font-bold"
              :class="{ 'lg:block': showSideBar }"
              >Roll</span
            >
          </RouterLink>

          <!-- Toggle button -->
          <button
            class="px-2 hidden lg:flex items-center space-x-2 rounded group"
            @click="toggleSideBar"
          >
            <OpenSidebarIcon
              v-if="!showSideBar"
              class="w-7 h-7 text-gray-600 group-hover:text-gray-800"
            />
            <CloseSidebarIcon
              v-else
              class="w-7 h-7 text-gray-600 group-hover:text-gray-800"
            />
          </button>
        </div>

        <!-- Links -->
        <div class="grow w-full">
          <div
            class="px-4 sm:px-0 sm:pt-8 w-full flex flex-row sm:flex-col sm:justify-center lg:justify-left items-center space-x-4 sm:space-x-0 sm:space-y-8 border-l sm:border-l-0 sm:border-t border-gray-300"
          >
            <RouterLink
              to="/"
              class="p-3 sm:w-full flex justify-center items-center text-lg hover:bg-gray-200 rounded"
            >
              <HomeIcon class="lg:mx-2 w-6 h-6" />
              <span
                class="hidden grow font-medium"
                :class="{ 'lg:block': showSideBar }"
                >Roulette</span
              >
            </RouterLink>

            <RouterLink
              to="/leaderboard"
              class="p-3 sm:w-full flex justify-center items-center text-lg hover:bg-gray-200 rounded"
            >
              <RectangleStackIcon class="lg:mx-2 w-6 h-6" />
              <span
                class="hidden grow font-medium"
                :class="{ 'lg:block': showSideBar }"
                >Leaderboard</span
              >
            </RouterLink>
          </div>
        </div>

        <!-- Bottom -->
        <div class="sm:w-full">
          <!-- Balance -->
          <label
            v-show="auth.isAuth"
            class="hidden my-4 px-4 py-2 items-center justify-center space-x-2 bg-white border border-gray-300 shadow-sm rounded"
            :class="{ 'lg:flex': showSideBar }"
          >
            <BanknotesIcon class="h-6 w-6 text-green-500" />
            <span>{{ auth.user.balance }}</span>
          </label>

          <!-- User Profile -->
          <RouterLink
            v-if="auth.isAuth"
            to="/"
            class="p-3 flex items-center justify-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            <svg
              class="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              class="hidden font-medium"
              :class="{ 'lg:block': showSideBar }"
              >{{ auth.user.name }}</span
            >
          </RouterLink>

          <!-- Login btn -->
          <RouterLink
            v-else
            to="/login"
            class="w-full flex items-center text-lg hover:bg-gray-200 rounded"
          >
            <svg
              class="w-6 h-6 stroke-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              class="hidden font-medium"
              :class="{ 'lg:block': showSideBar }"
              >Login</span
            >
          </RouterLink>
        </div>
      </div>
    </aside>

    <RouterView class="px-4 pb-4 sm:pt-4 grow" />
  </div>
</template>
