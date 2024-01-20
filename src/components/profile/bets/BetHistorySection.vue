<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import axios from "@/axios.config";

import type Bet from "@/interfaces/bet";

import BetHistory from "@/components/profile/bets/BetHistory.vue";

const props = defineProps<{
  user: string;
}>();

const betsOffset = ref(0);

const fetchUserBets = (name: string, offset: number, limit: number = 10): Promise<Bet[]> =>
  axios.get(`/users/${name}/bets?offset=${offset}&limit=${limit}`).then((res) => res.data);

const { isPending: betsIsPending, data: bets } = useQuery({
  queryKey: ["bets", props.user],
  queryFn: () => fetchUserBets(props.user, betsOffset.value),
});

const haveSomeBets = computed(() => bets.value && bets.value.length > 0);

const loadBets = async () => {
  await fetchUserBets(props.user, betsOffset.value);
  betsOffset.value += 10;
};
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h2 class="text-3xl font-bold">Bets</h2>
    <div class="p-4 grow bg-bkg-1 rounded-lg shadow shadow-gray-300 space-y-6">
      <div v-if="!betsIsPending">
        <div v-if="haveSomeBets" class="space-y-3">
          <BetHistory v-for="(bet, index) in bets" :key="index" :bet="bet" />

          <button
            class="btn w-full md:w-auto bg-black hover:bg-black-dark text-white"
            @click="loadBets()"
          >
            Load more
          </button>
        </div>
        <p v-else>This user has no bets yet.</p>
      </div>
    </div>
  </div>
</template>
