<script setup lang="ts">
import { ref } from "vue";
import { SparklesIcon } from "@heroicons/vue/24/outline";

import useAvatarStore from "@/stores/avatar";

import availableStyles from "@/config/styles";
import getRandomOptions from "@/utils/getRandomOptions";
import getApiUrl from "@/utils/getApiUrl";

import { useUserSettings } from "@/composables/useUserSettings";

const avatar = useAvatarStore();
const { updateAvatar } = useUserSettings();

const show = ref(false);

function onShuffle() {
  avatar.selectedStyleOptions = getRandomOptions(availableStyles[avatar.selectedStyleName].options);
}

async function onSave() {
  show.value = true;

  const avatarUrl = getApiUrl(avatar.selectedStyleName, avatar.selectedStyleOptions);
  updateAvatar(avatarUrl);
}
</script>

<template>
  <div class="header">
    <button class="header-shuffle" @click="onShuffle" title="shuffle">
      <SparklesIcon />
    </button>
    <button class="header-save" @click="onSave">save</button>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
}

.header-shuffle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #fff;
  color: #0f172a;
  opacity: 0.9;
}

.header-shuffle::hover {
  opacity: 1;
}

.header-save {
  display: flex;
  align-items: center;
  height: 40px;
  border-radius: 20px;
  padding: 0 16px;
  font-weight: 600;
  line-height: 1;
  background-color: #fff;
  color: #0f172a;
  opacity: 0.9;
}

.header-save:hover {
  opacity: 1;
}

svg {
  width: 24px;
  height: 24px;
}
</style>
