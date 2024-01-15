<script setup lang="ts">
import { useAvatarStore } from "@/stores/avatar";

import Avatar from "@/components/avatar/Avatar.vue";

const avatar = useAvatarStore();
</script>

<template>
  <div class="preview">
    <Avatar :svg="avatar.selectedStylePreview.toString()" class="preview-image" />
  </div>
</template>

<style scoped>
.preview {
  --container-size: min(40vh, 100vw);
  --spacing: min(60px, calc(var(--container-size) / 6));

  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing);
}

.preview-image {
  --max-size: calc(var(--container-size) - var(--spacing) * 2);
  max-width: var(--max-size);
  border-radius: 20px;
  width: 100%;
  height: 100%;
}

.preview-image::before {
  position: absolute;
  content: "";
  width: 200vw;
  height: 200vw;
}
</style>
