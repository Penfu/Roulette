<script setup lang="ts">
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
          v-for="(_option, i) in store.availableOptions"
          :key="i"
          class="tag bg-gray-200 enabled:hover:bg-gray-100 ui-selected:outline outline-3 outline-green"
        >
          {{ capitalCase(i) }}
        </Tab>
      </TabList>

      <TabPanels class="p-2 mt-8 max-h-72 md:max-h-none overflow-y-auto">
        <TabPanel v-for="(option, k) in store.availableOptions" :key="k">
          <div class="flex flex-wrap gap-4">
            <button
              v-for="value in option?.values"
              :key="value"
              type="button"
              @click="store.selectedOptions[k] = [value]"
              class="outline-3 outline-offset-4 outline-green-400 rounded-xl"
              :class="{ 'outline': store.selectedOptions[k]?.includes(value) }"
            >
              <Avatar
                class="w-20 md:w-24"
                :options="{ ...store.selectedOptions, [k]: [value] }"
              />
            </button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
