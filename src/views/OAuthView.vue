<script setup lang="ts">
import { nextTick, onMounted } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

const props = defineProps({
  provider: {
    type: String,
    required: true,
  },
});

const { loginOAuthCallback } = useAuthStore();

onMounted(async () => {
  const code = router.currentRoute.value.query.code as string;

  if (code) {
    const response = await loginOAuthCallback(props.provider, code);

    if (response.success) {
      nextTick(() => {
        router.push("/");
      });
    }
  }
});
</script>

<template>
  <main class="mx-4 flex justify-center items-start md:items-center">
    <div
      class="py-8 md:py-16 w-full flex flex-col lg:flex-row items-center justify-center gap-12 overflow-hidden"
    >
      <div>
        <h2
          v-motion-pop
          class="text-4xl xs:text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-extrabold uppercase leading-normal"
        >
          Wait...
          <span class="block px-2 w-min bg-green text-white shadow shadow-green-300">{{
            props.provider
          }}</span>
        </h2>
      </div>

      <img
        v-motion-pop
        ref="wheel"
        src="@/assets/roulette.png"
        alt="Roulette"
        class="w-64 h-64 xs:w-80 xs:h-80 sm:w-96 sm:h-96 md:w-[36rem] md:h-[36rem] lg:w-96 lg:h-96 object-contain transition-width duration-500 animate-roulette-loader"
      />
    </div>
  </main>
</template>
