<script setup lang="ts">
import { computed } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { isEqual } from 'lodash';
import axios from '@/axios.config';

import { useAuthStore } from '@/stores/auth';
import { useAvatarStore } from '@/stores/avatar';

import AvatarImg from '@/components/avatar/AvatarImg.vue';
import OptionsEditor from '@/components/avatar/OptionsEditor.vue';
import PendingButton from '@/components/PendingButton.vue';

const auth = useAuthStore();
const store = useAvatarStore();

const { isPending, mutate } = useMutation({
  mutationFn: () => axios.patch('/users/me/avatar', { avatar: store.selectedOptions }),
  onSuccess: () => {
    auth.user.avatar = { ...store.selectedOptions };
  },
});

const isDefault = computed(() => isEqual(store.selectedOptions, store.defaultOptions));
const isFirstAndDefault = computed(() => !auth.user.avatar && isDefault.value);
const hasChanged = computed(() => !isEqual(store.selectedOptions, auth.user.avatar));

const canSubmit = computed(() => !isPending.value && !isFirstAndDefault.value && hasChanged.value);
</script>

<template>
  <section class="space-y-4">
    <h4>Change your avatar</h4>

    <form @submit.prevent="mutate()" class="space-y-2">
      <div class="space-y-6">
        <div class="space-y-8">
          <AvatarImg class="w-44" :options="store.selectedOptions" />
          <OptionsEditor />
        </div>

        <PendingButton type="submit" :disabled="!canSubmit" :pending="isPending" class="btn-primary w-full sm:w-auto">
          Change avatar
        </PendingButton>
      </div>
    </form>
  </section>
</template>
