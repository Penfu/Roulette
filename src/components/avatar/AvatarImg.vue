<script setup lang="ts">
import { computed } from 'vue';
import { createAvatar } from '@dicebear/core';
import { adventurer } from '@dicebear/collection';

import { useAvatarStore } from '@/stores/avatar';

const props = defineProps<{
  options?: any;
  invisible?: boolean;
}>();

const store = useAvatarStore();

const src = computed(
  () =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      createAvatar(adventurer, props.options ?? store.defaultOptions).toString(),
    )}`,
);
</script>

<template>
  <img :src="src" loading="lazy" class="rounded-lg" />
</template>
