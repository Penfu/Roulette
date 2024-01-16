<script setup lang="ts">
import {type Options, createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { capitalCase } from "change-case";

import { useAvatarStore } from "@/stores/avatar";

import Avatar from "@/components/avatar/Avatar.vue";

const store = useAvatarStore();
</script>

<template>
  <div>
    <TabGroup>
      <TabList class="flex flex-wrap gap-4">
        <Tab
          v-for="(option, i) in store.availableOptions"
          :key="i"
          :disabled="option.values.length <= 1"
          class="px-2 h-8 rounded-lg bg-gray-200 enabled:hover:bg-gray-300 disabled:hidden"
        >
          {{ capitalCase(i) }}
        </Tab>
      </TabList>

      <TabPanels class="mt-8">
        <TabPanel v-for="(option, k) in store.availableOptions" :key="k">
          <div class="flex flex-wrap gap-4">
            <button
              v-for="value in option.values"
              :key="value"
              @click="store.selectedOptions[k] = [value]"
              class="outline-2 outline-offset-4 outline-green-400 rounded-xl"
              :class="{ 'outline': store.selectedOptions[k].includes(value) }"
            >
              <Avatar
                class="w-24"
                :svg="createAvatar(adventurer, { ...store.selectedOptions, [k]: [value] }).toString()"
              />
            </button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
