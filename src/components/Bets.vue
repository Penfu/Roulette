<script lang="ts">
import Bet from "../components/Bet.vue";
import Color from "./../enums/Color";

export default {
  components: {
    Bet,
  },
  emits: ["add-bet"],
  props: {
    active: Boolean,
    color: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    bets : {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      Color,
      bet: Bet,
    };
  },
  methods: {
    addBet() {
      if (this.active) {
        this.$emit("add-bet", this.color);
      }
    },
  },
};
</script>

<template>
  <div class="basis-1/3 flex flex-col space-y-4">
    <button
      :disable="() => !active"
      @click="addBet"
      class="py-4 font-semibold rounded shadow"
      :class="{
        'bg-red-500 hover:bg-red-600 shadow-red-300': color == Color.RED,
        'bg-green-500 hover:bg-green-600 shadow-green-300': color == Color.GREEN,
        'bg-gray-900 hover:bg-black shadow-gray-500': color == Color.BLACK,
      }"
    >
      x {{ value}}
    </button>
    <div
      class="p-2 h-64 overflow-y-hidden space-y-2 bg-gray-100 text-left text-xl text-gray-800 rounded shadow shadow-gray-300">
      <Bet v-for="(bet, index) in bets" :key="index" :name="bet.user" :color="bet.color" :value="bet.value" />
    </div>
  </div>
</template>
