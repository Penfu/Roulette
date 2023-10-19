import { ref } from "vue";
import axios from "axios";

import type Roll from "@/interfaces/roll";

export function useRoll() {
  const rolls = ref<Roll[]>([]);
  const error = ref(null);

  async function fetchRolls() {
    const response = await axios.get("http://localhost:8000/api/rolls");
    rolls.value = response.data;
  }

  return { error, fetchRolls, rolls };
}
