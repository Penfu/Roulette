<script setup lang="ts">
import { ref, watch } from 'vue';
import anime from "animejs";

import { useGameStore } from '@/stores/game';

import ColorHelper from '@/helpers/color';
import { RollStep } from '@/enums/step';
import Color from '@/enums/color';

import type Roll from '@/models/roll';

import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue';

import Histories from './Histories.vue';

const props = defineProps<{
  result: Roll;
  message: string;
}>();

const game = useGameStore();

const wheel = ref(HTMLInputElement);

watch(
  () => game.step,
  (step) => {
    if (step === RollStep.RESET) {
      anime.timeline({loop: 1})
        // Make the wheel disappear
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
        // Make the wheel appear
        .add({
          targets: wheel.value,
          scale: [0, 1],
          opacity: [0, 1],
          duration: 925,
        })
    }
    else if (step === RollStep.ROLL) {
      // Make the wheel spin
      anime({
        targets: wheel.value,
        rotate: 360 * 6,
        duration: 6000,
        easing: "linear",
        paused: false,
      });
    }
    else if (step === RollStep.ROLL_TO_RESULT) {
      // Stop the wheel at the winning case
      const caseSize = 360 / 11; // 11 cases
      const halfCaseSize = caseSize / 2;
      const marge = caseSize / 10;

      let finalAngle = 0;

      if (props.result.color === Color.RED) {
        let caseNum = Math.floor(Math.random() * 5); // 5 possible cases for red
        finalAngle = halfCaseSize; // Add Green case before
        finalAngle += caseSize + (caseNum * 2 * caseSize); // Add Red(s) and Black(s) cases before
        finalAngle += anime.random(marge, caseSize - marge);
      }
      else if (props.result.color === Color.BLACK) {
        let caseNum = Math.floor(Math.random() * 5) + 1; // 5 possible cases for black
        finalAngle = halfCaseSize; // Add Green case before
        finalAngle += caseNum * 2 * caseSize; // Add Red(s) and Black(s) cases before
        finalAngle += anime.random(marge, caseSize - marge); // Add random size inside the range with marge
      }
      else if (props.result.color === Color.GREEN) {
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
          anime.set(wheel.value, { 'rotate': currentRotation });
        },
      });
    }
  }
);

</script>

<template>
  <div class="flex flex-col xl:flex-row items-center xl:items-stretch">
    <div class="py-2 basis-2/3 flex flex-col justify-center items-center space-y-2">
      <ChevronDownIcon />
      <img ref="wheel" src="@/assets/roulette.png" alt="Roulette" class="h-80 w-80 object-contain" />
    </div>
    <div class="basis-1/3 flex flex-col justify-end">
      <div class="h-20 my-8 flex grow justify-center items-center text-center text-2xl font-semibold uppercase">
        <p v-show="game.step === RollStep.BET">{{ message }}</p>
        <p v-show="game.step === RollStep.ROLL || game.step === RollStep.ROLL_TO_RESULT">ROLLING...</p>
        <div v-show="game.step === RollStep.DISPLAY_RESULT" class="flex items-center justify-center space-x-4">
          <p>Result</p>
          <span class="block px-3 py-1 text-white bg-red-500 rounded text-center shadow-md"
            :class="ColorHelper.getClassFromColor(result.color)">{{ result.value }}</span>
        </div>
      </div>
      <div class="justify-end items-center xl:items-end">
        <Histories class="basis-1/3" :histories="(game.histories as Roll[])" />
      </div>
    </div>
  </div>
</template>
