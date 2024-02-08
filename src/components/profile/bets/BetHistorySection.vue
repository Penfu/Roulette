<script setup lang="ts">
import { useInfiniteQuery } from "@tanstack/vue-query";
import axios from "@/axios.config";

import BetHistory from "@/components/profile/bets/BetHistory.vue";
import PendingButton from "@/components/PendingButton.vue";
import { computed } from "vue";

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
  queryKey: ["bets", props],
  queryFn: fetchBets,
  initialPageParam: undefined,
  getNextPageParam: (lastPage: any) => lastPage.data.nextCursor,
});

const hasBets = computed(() => bets.value?.pages[0].data.data.length > 0);
</script>

<template>
  <section class="flex flex-col space-y-4">
    <h2>Bets</h2>

    <div v-if="!isPending">
      <div v-if="hasBets" class="space-y-6">
        <div class="space-y-3">
          <template v-for="page in bets?.pages">
            <BetHistory v-for="bet in page.data.data" :key="bet.id" :bet="bet" />
          </template>
        </div>

        <PendingButton
          v-if="hasNextPage"
          @click="fetchNextPage()"
          type="button"
          :disabled="isFetchingNextPage"
          :pending="isFetchingNextPage"
          class="btn-primary w-full sm:w-auto"
        >
          Show more
        </PendingButton>
      </div>
      <p v-else class="w-full">This user has no bets yet.</p>
    </div>
    <span v-else class="w-full h-12 bg-skeleton rounded-lg animate-pulse" />
  </section>
</template>
