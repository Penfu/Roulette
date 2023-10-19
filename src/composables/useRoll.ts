import { ref } from "vue";
import axios from "axios";

import type Roll from "@/interfaces/roll";

export function useRoll() {
  const error = ref(null);
  const rolls = ref<Roll[]>([]);

  async function fetchRolls() {
    const response = await axios.get("/rolls");
    rolls.value = response.data;
  }

  return { error, fetchRolls, rolls };
}
