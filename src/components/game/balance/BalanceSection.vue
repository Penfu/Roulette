<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { TransitionRoot } from '@headlessui/vue';
import anime from 'animejs';

import { useSettingsStore } from '@/stores/settings';
import { useAuthStore } from '@/stores/auth';
import { useGameStore } from '@/stores/game';

import AmountButton from '@/components/game/balance/AmountButton.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import LoginToPlayDialog from '@/components/game/LoginToPlayDialog.vue';

const settings = useSettingsStore();
const { amounts } = storeToRefs(settings);

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const game = useGameStore();
const { balance } = storeToRefs(game);
const { allInBalance, resetBalance } = game;

const balanceToDisplay = ref(0);
watch(
  () => balance.value,
  (newBalance, oldBalance) => {
    anime({
      targets: balanceToDisplay,
      value: [oldBalance, newBalance],
      round: 1,
      duration: 500,
      easing: 'linear',
    });
  },
);

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleSelectAmount = () => {
  if (!user.value) {
    openModal();
  }
};

const handleAllIn = () => {
  if (!user.value) {
    openModal();
    return;
  }

  allInBalance();
};

const handleResetBalance = () => {
  if (!user.value) {
    openModal();
    return;
  }

  resetBalance();
};
</script>

<template>
  <div class="space-y-2">
    <h4 class="uppercase">Choose an amount</h4>
    <section class="px-4 py-2 flex flex-col xs:flex-row xs:justify-between gap-8 md:gap-16 text-xl">
      <div class="w-full flex flex-wrap gap-2">
        <AmountButton
          v-for="amount in amounts"
          :key="amount"
          :value="amount"
          :onSelect="handleSelectAmount"
        />
      </div>

      <div class="w-auto flex flex-col lg:flex-row lg:justify-end gap-2">
        <span
          class="px-2 md:px-4 h-11 xs:min-w-[4rem] sm:min-w-[8rem] flex justify-center items-center rounded border-3 border-gray-300 shadow shadow-gray-300"
        >
          {{ balanceToDisplay }}
        </span>
        <div class="flex space-x-2">
          <button
            @click="handleAllIn"
            class="btn basis-1/2 bg-gray-200 hover:bg-gray-300 whitespace-nowrap rounded shadow shadow-gray-300"
          >
            All In
          </button>
          <button
            @click="handleResetBalance"
            aria-label="Reset balance"
            class="btn basis-1/2 flex justify-center items-center bg-red hover:bg-red-dark text-white stroke-2 rounded border-red shadow shadow-red-300"
          >
            <CrossIcon />
          </button>
        </div>
      </div>
    </section>
  </div>

  <TransitionRoot appear :show="isOpen" as="template">
    <LoginToPlayDialog :onClose="closeModal" />
  </TransitionRoot>
</template>
