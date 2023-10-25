<script setup lang="ts">
import { ref, watch } from "vue";
import anime from "animejs";

import { useGameStore } from "@/stores/game";

import { RollStep } from "@/enums/step";
import { Color } from "@/enums/color";
import getClassFromColor from "@/helpers/color";

import ChevronDownIcon from "@/components/icons/ChevronDownIcon.vue";
import Histories from "@/components/game/rolls/Histories.vue";

defineProps<{
  message: string;
}>();

const game = useGameStore();

const wheel = ref(HTMLInputElement);

watch(
  () => game.step,
  (step) => {
    if (step === RollStep.RESET) {
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
    } else if (step === RollStep.ROLL) {
      // Make the wheel spin
      anime({
        targets: wheel.value,
        rotate: 360 * 6,
        duration: 6000,
        easing: "linear",
        paused: false,
      });
    } else if (step === RollStep.ROLL_TO_RESULT && game.result) {
      // Stop the wheel at the winning case
      const caseSize = 360 / 11; // 11 cases
      const halfCaseSize = caseSize / 2;
      const marge = caseSize / 10;

      let finalAngle = 0;

      if (game.result.color === Color.RED) {
        const winningCaseIndex = Math.floor(Math.random() * 5); // 5 possible cases for red
        finalAngle = halfCaseSize; // Add Green case before
        finalAngle += caseSize + winningCaseIndex * 2 * caseSize; // Add Red(s) and Black(s) cases before
        finalAngle += anime.random(marge, caseSize - marge);
      } else if (game.result.color === Color.BLACK) {
        const winningCaseIndex = Math.floor(Math.random() * 5) + 1; // 5 possible cases for black
        finalAngle = halfCaseSize; // Add Green case before
        finalAngle += winningCaseIndex * 2 * caseSize; // Add Red(s) and Black(s) cases before
        finalAngle += anime.random(marge, caseSize - marge); // Add random size inside the range with marge
      } else if (game.result.color === Color.GREEN) {
        finalAngle = 360 + anime.random(-halfCaseSize + marge, halfCaseSize - marge);
      }

      const currentRotation = parseFloat(anime.get(wheel.value, "rotate") as string);
      const rotationToEndTheTurn = 360 - (currentRotation % 360);

      finalAngle += currentRotation + rotationToEndTheTurn;

      anime({
        targets: wheel.value,
        rotate: finalAngle,
        duration: 2000,
        easing: "easeOutQuad",
        paused: false,

        begin: function () {
          anime.set(wheel.value, { rotate: currentRotation });
        },
      });
    }
  }
);
</script>

<template>
  <div class="flex flex-col xl:flex-row items-center xl:items-stretch gap-2 lg:gap-4">
    <div class="py-2 basis-2/3 flex flex-col justify-center items-center space-y-2">
      <ChevronDownIcon />
      <img
        v-motion-pop
        ref="wheel"
        src="@/assets/roulette.png"
        alt="Roulette"
        class="w-60 h-60 md:w-80 md:h-80 object-contain transition-width duration-500"
        :class="{
          ' !rotate-0': game.step === RollStep.BET,
        }"
      />
    </div>

    <div class="basis-1/3 flex flex-col justify-end space-y-4 lg:space-y-8 xl:space-y-0">
      <div class="h-14 flex grow justify-center items-center text-center text-3xl xl:text-5xl font-semibold uppercase">
        <span v-show="game.step === RollStep.BET">{{ message }}</span>
        <span v-show="game.step === RollStep.ROLL || game.step === RollStep.ROLL_TO_RESULT">
          Rolling...
        </span>
        <div
          v-if="game.step === RollStep.DISPLAY_RESULT && game.result"
          class="flex items-center justify-center space-x-4"
        >
          <span>Result</span>
          <span
            class="h-12 w-12 xl:h-20 xl:w-20 flex items-center justify-center text-white rounded text-center shadow-md"
            :class="getClassFromColor(game.result.color)"
            >{{ game.result.value }}</span
          >
        </div>
      </div>

      <div class="justify-end items-center xl:items-end">
        <Histories :rolls="game.histories" />
      </div>
    </div>
  </div>
</template>
