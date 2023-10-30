import { ref } from "vue";
import axios from "axios";

import type User from "@/interfaces/user";

export const useUser = () => {
  const error = ref(null);
  const users = ref<User[]>([]);

  const fetchUsers = async () => {
    const response = await axios.get("/users");
    users.value = response.data;
  }

  return { error, fetchUsers, users };
}
