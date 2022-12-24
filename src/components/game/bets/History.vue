<script setup lang="ts">
import type Bet from '@/models/bet';

defineProps<{
  bet: Bet;
}>();
</script>

<template>
  <div class="p-4 flex bg-gray-50 rounded">
    <div class="grow">
      <span>{{ bet.color }}</span>
      <span>{{ bet.value }}</span>
    </div>
    <span>{{ bet.created_at }}</span>
  </div>
</template>
