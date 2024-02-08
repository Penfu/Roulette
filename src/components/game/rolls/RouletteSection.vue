<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import anime from "animejs";

import { useGameStore } from "@/stores/game";

import { RollStep } from "@/enums/step";
import { classFromColor } from "@/helpers/color";

import HistoryLayout from "@/components/game/rolls/HistoryLayout.vue";
import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";

defineProps<{
  message: string;
}>();

const game = useGameStore();
const { step, result } = storeToRefs(game);

const wheel = ref(null);

const caseCount = 11;
const caseSize = 360 / caseCount;
const halfCaseSize = caseSize / 2;
const caseMarge = caseSize / 10;

const minAngle = caseMarge;
const maxAngle = caseSize - caseMarge;

const minTurn = 3;
const maxTurn = 5;

watch(
  () => step.value,
  (step) => {
    if (step === RollStep.ROLL && result.value) {
      // Stop the wheel at the winning case
      let finalAngle = 0;
      finalAngle = result.value.value * caseSize - halfCaseSize;
      finalAngle += Math.random() * (maxAngle - minAngle) + minAngle; // Add a random angle

      const turn = Math.round(Math.random() * (maxTurn - minTurn) + minTurn);

      anime({
        targets: wheel.value,
        rotate: 360 * turn - finalAngle,
        duration: 5500,
        easing: "easeInOutQuad",
        paused: false,
      });
    } else if (step === RollStep.RESET) {
      anime
        .timeline()
        .add({
          targets: wheel.value,
          scale: [1, 0],
          opacity: [1, 0],
          duration: 925,
        })
        .add({
          targets: wheel.value,
          rotate: 0,
          duration: 50,
        })
        .add({
          targets: wheel.value,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 925,
        });
    }
  }
);
</script>

<template>
  <section class="flex flex-col xl:flex-row items-center xl:items-stretch gap-2 lg:gap-4">
    <div class="py-2 basis-2/3 flex flex-col justify-center items-center space-y-2">
      <ChevronDownIcon />
      <img
        v-motion-pop
        ref="wheel"
        src="@/assets/roulette.png"
        alt="Roulette"
        class="w-60 h-60 md:w-72 md:h-72 object-contain transition-width duration-500"
      />
    </div>

    <div class="basis-1/3 flex flex-col justify-end space-y-4 lg:space-y-8 xl:space-y-0">
      <div
        class="h-14 flex grow justify-center items-center text-center text-2xl xl:text-4xl font-semibold uppercase"
      >
        <span v-show="step === RollStep.BET">{{ message }}</span>
        <span v-show="step === RollStep.ROLL"> Rolling... </span>
        <div
          v-if="step === RollStep.DISPLAY_RESULT && result"
          class="flex items-center justify-center space-x-4"
        >
          <span>Result</span>
          <span
            class="h-12 w-12 xl:h-20 xl:w-20 flex items-center justify-center text-white rounded-lg shadow"
            :class="classFromColor(result.color)"
          >
            {{ result.value }}
          </span>
        </div>
      </div>

      <div class="justify-end items-center xl:items-end">
        <HistoryLayout />
      </div>
    </div>
  </section>
</template>
