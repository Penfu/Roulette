<script lang="ts">
import { ref } from 'vue';
import { useUserStore } from "./stores/user";
import Dropdown from './components/Dropdown.vue';

export default {
  name: "App",
  components: {
    Dropdown,
  },
  watch: {
    '$route'() {
      this.showMenu = false;
    }
  },
  setup() {
    let showMenu = ref(false);
    const toggleNav = () => (showMenu.value = !showMenu.value);
    return { showMenu, toggleNav };
  },
  data() {
    return {
      auth: useUserStore(),
    };
  },
};
</script>

<template>
  <div>
    <div class="bg-gray-100">
      <nav class="py-4 mx-4 md:mx-8 lg:mx-16 xl:mx-32 md:flex md:justify-start md:items-end md:space-x-6">
        <!-- Menu -->
        <div :class="showMenu ? 'flex' : 'hidden'" class="w-full hidden md:flex items-end space-x-4">
          <!-- Title -->
          <router-link to="/" class="text-xl font-bold text-gray-800 md:text-2xl hover:text-gray-900">
            Rolls
          </router-link>

          <!-- Links -->
          <div class="px-8 grow space-x-8">
            <RouterLink to="/" class="text-lg">Home</RouterLink>
            <RouterLink to="/leaderboard" class="text-lg">Leaderboard</RouterLink>
          </div>

          <!-- Balance -->
          <label v-show="auth.isAuth"
            class="px-4 py-2 flex space-x-2 bg-white border border-gray-300 shadow-sm rounded">
            <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
            </svg>
            <span>{{ auth.user.balance }}</span>
          </label>

          <!-- User Dropdown -->
          <div v-if="auth.isAuth" class="relative">
            <Dropdown>
              <template #header>
                <span class="mr-4">{{ auth.user.name }}</span>
              </template>
              <template #body>
                <button @click="auth.logout"
                  class="w-full px-4 py-2 hover:bg-blue-400 text-sm text-left text-gray-800 hover:text-gray-50 border-t-2">
                  Logout
                </button>
              </template>
            </Dropdown>
          </div>
          <div v-else>
            <RouterLink to="/login"
              class="inline-flex justify-center px-6 py-2 rounded-md border border-gray-300 shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              Login
            </RouterLink>
          </div>
        </div>

        <!-- Mobile menu -->
        <div class="flex flex-col md:hidden items-center">
          <div class="w-full flex">
            <div class="grow flex items-center space-x-2">
              <button @click="toggleNav" type="button"
                class="text-gray-800 hover:text-gray-900 focus:outline-none focus:text-gray-9 00">
                <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                  <path fill-rule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                  </path>
                </svg>
              </button>
              <router-link to="/" class="text-xl font-bold text-gray-800 md:text-2xl hover:text-gray-900">
                Rolls
              </router-link>
            </div>

            <!-- Balance -->
            <label v-show="auth.isAuth"
              class="px-4 py-2 flex space-x-2 bg-white border border-gray-300 shadow-sm rounded">
              <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
              </svg>
              <span>{{ auth.user.balance }}</span>
            </label>
          </div>

          <!-- Links -->
          <div :class="showMenu ? 'flex' : 'hidden'" class="w-full md:hidden grow flex-col mt-8 space-y-4">
            <div class="flex flex-col space-y-2">
              <RouterLink to="/" class="px-8 py-2 text-lg hover:bg-gray-200 rounded">Home</RouterLink>
              <RouterLink to="/leaderboard" class="px-8 py-2 text-lg hover:bg-gray-200 rounded">Leaderboard</RouterLink>
            </div>

            <div class="py-4 border-t-2 border-gray-300">
              <div v-if="auth.isAuth">
                <div class="mb-6">
                  <span>{{ auth.user.name }}</span>
                </div>

                <button @click="auth.logout"
                  class="w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded text-left text-white hover:text-gray-50">
                  Logout
                </button>
              </div>
              <div v-else class="flex">
                <RouterLink to="/login"
                  class="grow w-full px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded text-left text-white hover:text-gray-50">
                  Login
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <RouterView class="my-8" />
  </div>
</template>
