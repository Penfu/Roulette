<script setup lang="ts">
import { ref } from "vue";
import { SparklesIcon } from "@heroicons/vue/24/outline";

import useAvatarStore from "@/stores/avatar";

import availableStyles from "@/config/styles";
import getRandomOptions from "@/utils/getRandomOptions";
import getApiUrl from "@/utils/getApiUrl";

const avatar = useAvatarStore();
const show = ref(false);

function onShuffle() {
  avatar.selectedStyleOptions = getRandomOptions(availableStyles[avatar.selectedStyleName].options);
}

async function onDownload() {
  show.value = true;

  const apiUrl = getApiUrl(avatar.selectedStyleName, avatar.selectedStyleOptions, "png");

  const response = await fetch(apiUrl);
  const blob = await response.blob();
  const file = URL.createObjectURL(blob);
  const timestamp = new Date().getTime();

  const link = document.createElement("a");
  link.href = file;
  link.download = `${avatar.selectedStyleName}-${timestamp}.png`;
  link.target = "_blank";
  link.click();
  link.remove();

  URL.revokeObjectURL(file);
}
</script>

<template>
  <div class="header">
    <button class="header-shuffle" @click="onShuffle" title="shuffle">
      <SparklesIcon />
    </button>
    <button class="header-save" @click="onDownload">save</button>
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
