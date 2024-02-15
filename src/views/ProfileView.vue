<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from '@/configs/axios';
import moment from 'moment';

import type User from '@/interfaces/user';
import type Stats from '@/interfaces/stats';

import AvatarImg from '@/components/avatar/AvatarImg.vue';
import UserStats from '@/components/profile/stats/StatsSection.vue';
import BetsHistory from '@/components/profile/bets/BetHistorySection.vue';

const props = defineProps<{
  name: string;
}>();

interface UserWithStats extends User {
  stats: Stats;
}

const fetchUser = (): Promise<UserWithStats> => axios.get(`/users/${props.name}`).then((res) => res.data);

const { data: user } = useQuery({
  queryKey: ['profiles', props],
  queryFn: () => fetchUser(),
});
</script>

<template>
  <main class="flex flex-col space-y-8 md:space-y-10">
    <section>
      <div v-if="user" class="flex flex-col md:flex-row gap-8">
        <div class="grow h-full flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
          <AvatarImg class="w-44" :options="user.avatar" />

          <!-- Description -->
          <div class="py-4 flex flex-col">
            <div class="grow">
              <h3>{{ user.name }}</h3>
            </div>
            <span>Joined {{ moment(user.createdAt).fromNow() }}</span>
          </div>
        </div>

        <!-- Balance -->
        <div class="flex flex-col justify-center items-center">
          <span class="text-3xl font-bold uppercase">{{ user?.balance }} coins</span>
        </div>
      </div>
      <!-- User Skeleton -->
      <div v-else class="w-full h-44 bg-skeleton rounded-lg animate-pulse"></div>
    </section>

    <UserStats :stats="user?.stats" />

    <BetsHistory :user="name" />
  </main>
</template>
