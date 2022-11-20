<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useUserStore } from "./stores/user";

export default {
  name: "App",
  data() {
    return {
      auth: useUserStore(),
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
          <label v-show="auth.isAuth" class>{{ auth.user.balance}}</label>

          <div class="flex items-center">
            <div v-if="auth.isAuth" class="relative inline-block text-left">
              <button type="button"
                class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-6 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="menu-button" aria-expanded="true" aria-haspopup="true">
                {{ auth.user.name }}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                  fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd" />
                </svg>
              </button>
              <div
                class="hidden origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div class="py-1" role="none">
                  <a href="/logout" class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1"
                    id="menu-item-0">
                    Logout
                  </a>
                </div>
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
