<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { UserIcon } from "@heroicons/vue/24/outline";

import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
</script>

<template>
  <Menu as="div" class="relative">
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
      <MenuItems
        class="absolute z-40 right-0 mt-2 w-56 origin-top-right divide-y-2 divide-gray-100 rounded-md bg-gray-200 shadow-lg focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <RouterLink
              :to="'/profile/' + auth.user.name"
              class="block p-2 rounded text-left"
              :class="{ 'bg-gray-300': active }"
            >
              {{ auth.user.name }}
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <RouterLink
              to="/settings"
              class="block p-2 rounded text-left"
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
    </transition>
  </Menu>
</template>
