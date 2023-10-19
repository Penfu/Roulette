import { ref } from "vue";
import axios from "axios";

import type User from "@/interfaces/user";

export function useUser() {
  const error = ref(null);
  const users = ref<User[]>([]);

  async function fetchUsers() {
    const response = await axios.get("/users");
    users.value = response.data;
  }

  return { error, fetchUsers, users };
}
