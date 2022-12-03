<script lang="ts">
import { useUserStore } from "../stores/user";

export default {
  name: "ProfileView",
  data() {
    return {
      auth: useUserStore(),
    };
  },
};
</script>

<template>
  <main>
    PROFILE
    {{ auth.user.name }}
  </main>
</template>
