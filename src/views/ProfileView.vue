<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/user";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
});

const auth = useUserStore();
const user = ref(null as any);
const bets = ref([] as Array<any>);

onMounted(async () => {
  user.value = await axios
    .get(`http://localhost:8000/api/users/${props.username}`)
    .then((res) => res.data);
  bets.value = Array.from({ length: 10 });
});
</script>

<template>
  <main class="h-screen space-y-8 md:space-y-10">
    <!-- User -->
    <div class="p-8 bg-white rounded-lg shadow shadow-gray-300">
      <div class="flex space-x-8">
        <!-- Avatar -->
        <div>
          <div class="w-32 h-32 bg-gray-600 rounded-lg"></div>
        </div>

        <!-- Description -->
        <div class="grow flex flex-col">
          <div class="grow">
            <h3 class="text-3xl font-bold">{{ user?.name }}</h3>
            <h4>{{ user?.email }}</h4>
          </div>
          <span>Joined Feb 2022</span>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold">{{ user?.balance }}$</span>
          <span>Balance</span>
        </div>
      </div>
    </div>

    <!-- Global Review -->
    <div
      class="lg:mx-8 xl:mx-32 grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-4 justify-items-center"
    >
      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">1024</span>
        <span>Bets</span>
      </div>

      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">50$</span>
        <span>Bet moyen</span>
      </div>

      <div
        class="py-6 w-full lg:w-64 flex flex-col justify-center items-center space-y-2 bg-white rounded-lg shadow shadow-gray-300"
      >
        <span class="text-3xl font-bold">50%</span>
        <span>Winrate</span>
      </div>
    </div>

    <!-- Colors Review -->
    <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
      <!-- Red -->
      <div
        class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300"
      >
        <div class="p-8 bg-red-500 rounded"></div>
        <div class="flex items-center space-x-4">
          <div class="grow flex flex-col">
            <span class="grow">Winrate 30%</span>
            <span>Count 100</span>
          </div>
        </div>
      </div>

      <!-- Green -->
      <div
        class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300"
      >
        <div class="flex items-center space-x-4">
          <div class="p-8 bg-green-500 rounded"></div>
          <div class="grow flex flex-col">
            <span class="grow">Winrate 50%</span>
            <span>Count 100</span>
          </div>
        </div>
      </div>

      <!-- Black -->
      <div
        class="p-2 w-full flex items-center space-x-8 bg-white rounded-lg shadow shadow-gray-300"
      >
        <div class="flex items-center space-x-4">
          <div class="p-8 bg-gray-900 rounded"></div>
          <div class="grow flex flex-col">
            <span class="grow">Winrate 10</span>
            <span>Count 100</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bets History -->
    <div class="p-8 bg-white rounded-lg shadow shadow-gray-300">
      <h3 class="text-gray-700 font-medium text-lg">Bets History</h3>
      <div v-for="i in bets" :key="i">
        <span>history</span>
      </div>
    </div>
  </main>
</template>
