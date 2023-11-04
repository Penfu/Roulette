<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { UserIcon } from "@heroicons/vue/24/outline";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <Menu as="div" class="xs:relative">
    <MenuButton class="btn p-3 flex justify-center bg-gray-200 hover:bg-gray-300">
      <UserIcon class="w-6 h-6" />
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        class="absolute z-40 mt-4 right-0 w-full xs:w-56 xs:origin-top-right transition-width duration-300 ease-in"
      >
        <MenuItems
          class="mx-4 xs:mx-0 divide-y-2 divide-gray-100 rounded-md bg-gray-200 shadow-lg focus:outline-none"
        >
          <div class="px-1 py-1">
            <MenuItem v-slot="{ active, close }" as="div">
              <span
                v-if="auth.loading"
                class="block mx-1 my-1 py-4 rounded bg-gray-300 animate-pulse"
              />
              <RouterLink
                v-else
                :to="'/profile/' + auth.user.name"
                @click="close"
                class="block p-2 rounded whitespace-nowrap"
                :class="{ 'bg-gray-300': active }"
              >
                {{ auth.user.name }}
              </RouterLink>
            </MenuItem>

            <MenuItem v-slot="{ active, close }" as="div">
              <RouterLink
                to="/settings"
                @click="close"
                class="block p-2 rounded"
                :class="{ 'bg-gray-300': active }"
              >
                Settings
              </RouterLink>
            </MenuItem>
          </div>

          <div class="px-1 py-1">
            <MenuItem v-slot="{ active }">
              <button
                @click="auth.logout"
                class="p-2 w-full rounded text-left"
                :class="{ 'bg-red text-white': active }"
              >
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </div>
    </transition>
  </Menu>
</template>
