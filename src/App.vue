<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

window.Echo.channel('channel').listen('Hello', (e: any) => {
  console.log(e);
});

</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/" class="mx-2">Home</RouterLink>
        <RouterLink to="/about" class="mx-2">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
