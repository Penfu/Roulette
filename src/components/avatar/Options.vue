<script setup lang="ts">
import { computed, ref } from "vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

import useMainStore from "@/stores/main";
import type { SelectedStyleOptions } from "@/types";

import Avatar from "./Avatar.vue";

const store = useMainStore();

const selectedTabIndex = ref(0);
const selectedTab = computed(() => tabs.value[Object.keys(tabs.value)[selectedTabIndex.value]]);

const tabs = computed(() => {
  const result: Record<
    string,
    Array<{
      avatar: string;
      active?: boolean;
      onClick: () => void;
    }>
  > = {};

  result["style"] = Object.keys(store.availableStyles).map((styleName) => ({
    avatar: store.availableStyles[styleName][0].avatar.toString(),
    active: store.selectedStyleName === styleName,
    onClick: () => changeStyleName(styleName),
  }));

  for (const key in store.selectedStyleCombinations) {
    result[key] = store.selectedStyleCombinations[key].map((combination) => ({
      avatar: combination.avatar.toString(),
      active: combination.active,
      onClick: () => changeOptions(combination.options),
    }));
  }

  return result;
});


function changeStyleName(styleName: string) {
  store.selectedStyleName = styleName;
}

function changeOptions(options: SelectedStyleOptions) {
  store.selectedStyleOptions = options;
}
</script>

<template>
  <div class="p-4 bg-white rounded-lg">
    <TabGroup :selectedIndex="selectedTabIndex" @change="selectedTabIndex = $event">
      <TabList class="flex flex-wrap gap-4">
        <Tab
          v-for="(key, i) in Object.keys(tabs)"
          :key="i"
          :disabled="tabs[key].length <= 1"
          class="px-2 h-8 rounded-lg bg-gray-200 enabled:hover:bg-gray-300 disabled:hidden"
        >
          {{ key }}
        </Tab>
      </TabList>

      <TabPanels class="mt-8">
        <TabPanel v-for="(key, i) in Object.keys(tabs)" :key="i"
        >
          <div class="options-body-slide">
            <div class="options-body-grid">
              <button
                v-for="(combination, ci) in selectedTab"
                :key="ci"
                :class="{
                  'options-body-avatar': true,
                  'options-body-avatar-active': combination.active,
                }"
                @click="combination.onClick"
              >
                <Avatar
                  :svg="combination.avatar"
                  class="options-body-avatar-component"
                />
              </button>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style scoped>
.options-body {
  display: flex;
  overflow: scroll;
  scroll-snap-type: x mandatory;
  flex-grow: 1;
}

.options-body-slide {
  padding: var(--van-padding-md) var(--van-padding-sm);
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.options-body-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(88px, 1fr));
  gap: 20px;
  width: 100%;
}

.options-body-avatar {
  position: relative;
}

.options-body-avatar::after {
  content: "";
  position: absolute;
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  border-radius: 18px;
  border: 0 solid #1689cc;
  transition: border-width 0.12s ease-in-out;
}

.options-body-avatar-active::after {
  border-width: 3px;
}

.options-body-avatar-component {
  border-radius: 12px;
  overflow: hidden;
}
</style>
