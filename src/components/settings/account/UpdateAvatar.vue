<script setup lang="ts">
import { useAvatarStore } from "@/stores/avatar";

import { useUserSettings } from "@/composables/useUserSettings";

import Avatar from "@/components/avatar/Avatar.vue";
import Options from "@/components/avatar/Options.vue";

const store = useAvatarStore();
const { updateAvatar } = useUserSettings();

const handleUpdateAvatar = () => {
  updateAvatar(store.selectedOptions);
};
</script>

<template>
  <form
    @submit.prevent="handleUpdateAvatar"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-bkg-1 rounded-lg space-y-4"
  >
    <h2 class="text-xl font-semibold">Change your avatar</h2>

    <div class="space-y-6">
      <div class="space-y-8">
        <Avatar class="w-44" :options="store.selectedOptions" />
        <Options />
      </div>

      <button type="submit" class="btn-primary w-full sm:w-auto">
        Change avatar
      </button>
    </div>
  </form>
</template>
