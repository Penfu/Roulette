<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

export default {
  name: "App",
  data() {
    return {
      auth: useUserStore(),
      show: false,
    };
  },
};
</script>

<template>
  <header>
    <div>
      <nav class="h-16 bg-gray-100 shadow">
        <div class="mx-4 sm:mx-8 md:mx-32 h-full flex items-center space-x-4">
          <div class="grow flex items-center">
            <a href="/" class="text-2xl font-bold uppercase">Rolls</a>
            <div class="ml-32 space-x-4">
              <RouterLink to="/" class="text-lg uppercase">Home</RouterLink>
              <RouterLink to="/about" class="text-lg uppercase">Leaderboard</RouterLink>
            </div>
          </div>

          <!-- Balance -->
          <label v-show="auth.isAuth" class>{{ auth.user.balance }}</label>

          <div class="flex items-center">
            <div v-if="auth.isAuth" class="relative">
              <!-- Dropdown toggle button -->
              <button @click="show = !show" class="p-2 flex items-center rounded border border-gray-300 shadow-sm bg-white hover:bg-gray-50 text-gray-800">
                <span class="mr-4">{{ auth.user.name }}</span>
                <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Dropdown menu -->
              <div v-show="show" class="absolute right-0 py-2 mt-2 w-44 bg-white rounded border border-gray-300 shadow">
                <button @click="auth.logout"
                  class="w-full px-4 py-2 hover:bg-blue-400 text-sm text-left text-gray-800 hover:text-gray-50 border-t-2">
                  Logout
                </button>
              </div>
            </div>
            <div v-else>
              <RouterLink to="/login"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                Login
              </RouterLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <RouterView class="my-8" />
</template>
