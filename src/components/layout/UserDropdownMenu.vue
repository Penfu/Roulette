<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { UserIcon } from '@heroicons/vue/24/outline';

import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
</script>

<template>
  <Menu as="div" class="xs:relative">
    <MenuButton aria-label="User Menu" class="btn p-2 flex justify-center bg-gray-200 hover:bg-gray-300">
      <UserIcon class="w-6 h-6" />
    </MenuButton>

    <div class="absolute z-40 mt-4 right-0 w-full xs:w-56 xs:origin-top-right transition-width duration-300 ease-in">
      <MenuItems
        v-motion
        :initial="{ opacity: 0.75, y: -10 }"
        :enter="{ opacity: 1, y: 0 }"
        class="mx-4 xs:mx-0 divide-y-2 divide-gray-100 rounded-md bg-gray-200 shadow-lg focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active, close }" as="div">
            <span v-if="auth.user === null" class="block mx-1 my-1 py-4 rounded bg-gray-300 animate-pulse" />
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
            <RouterLink to="/settings" @click="close" class="block p-2 rounded" :class="{ 'bg-gray-300': active }">
              Settings
            </RouterLink>
          </MenuItem>

          <MenuItem v-slot="{ active }">
            <button @click="auth.logout" class="p-2 w-full rounded text-left" :class="{ 'bg-red text-white': active }">
              Sign out
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </div>
  </Menu>
</template>
