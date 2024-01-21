<script setup lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import axios from "@/axios.config";

import BetHistory from "@/components/profile/bets/BetHistory.vue";

const props = defineProps<{
  user: string;
}>();

const fetchBets = ({ pageParam = 0 }) =>
  axios.get(`/users/${props.user}/bets`, { params: { cursor: pageParam } });

const {
  data: bets,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isPending,
} = useInfiniteQuery({
  queryKey: ["bets", props.user],
  queryFn: fetchBets,
  initialPageParam: undefined,
  getNextPageParam: (lastPage: any) => lastPage.data.nextCursor,
});
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h2 class="text-3xl font-bold">Bets</h2>
    <div class="p-4 grow bg-bkg-1 rounded-lg shadow shadow-gray-300 space-y-6">
      <div v-if="!isPending" class="space-y-4">
        <template v-for="page in bets?.pages" class="space-y-3">
          <BetHistory v-for="bet in page.data.data" :key="bet.id" :bet="bet" />
        </template>

        <button
          v-if="hasNextPage"
          :disabled="isFetchingNextPage"
          class="w-full md:w-auto btn-primary"
          @click="fetchNextPage()"
        >
          Load more
        </button>
      </div>
    </div>
  </div>
</template>
