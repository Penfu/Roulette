<script setup lang="ts">
import { ref } from "vue";

import Preview from "@/components/avatar/Preview.vue";
import Options from "@/components/avatar/Options.vue";
import Header from "@/components/avatar/Header.vue";

const header = ref<HTMLDivElement>();
const preview = ref<HTMLDivElement>();
</script>

<template>
  <div>
    <Header />
    <Preview />
    <Options />
  </div>
</template>
