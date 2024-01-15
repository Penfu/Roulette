<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useAuthStore } from "@/stores/auth";
import { useAvatarStore } from "@/stores/avatar";

import { useUserSettings } from "@/composables/useUserSettings";
import  { getApiUrl } from "@/utils/getApiUrl";

import Avatar from "@/components/avatar/Avatar.vue";
import Options from "@/components/avatar/Options.vue";

const avatar = useAvatarStore()
const { updateAvatar} = useUserSettings();

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const handleUpdateAvatar = () => {
  const avatarUrl = getApiUrl(avatar.selectedStyleName, avatar.selectedStyleOptions);
  updateAvatar(avatarUrl);
};
</script>

<template>
  <form
    @submit.prevent="handleUpdateAvatar"
    class="px-4 sm:px-8 py-3 sm:py-6 bg-bkg-1 rounded-lg space-y-4"
  >
    <h2 class="text-xl font-semibold">Change your avatar</h2>

    <div class="space-y-6">
      <div class="flex">
        <div class="preview">
          <Avatar :svg="avatar.selectedStylePreview.toString()" class="w-52" />
        </div>
        <Options />
      </div>

      <button type="submit" class="btn-primary w-full sm:w-auto md:w-full lg:w-auto">
        Change avatar
      </button>
    </div>
  </form>
</template>
