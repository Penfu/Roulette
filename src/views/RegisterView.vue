<script lang="ts">
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      csrfToken: "" as string,
      username: "" as string,
      email: "" as string,
      password: "" as string,
      passwordConfirmation: "" as string,
      errors: {},
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirmation) {
        this.errors = { password: ["Passwords do not match"] };
        return;
      }

      await this.userStore.register(this.username, this.email, this.password);

      if (this.userStore.isAuth) {
        this.$router.push("/");
      }
    }
  },
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <h2 class="text-3xl font-semibold uppercase">Register</h2>

      <!-- Manuel -->
      <form @submit.prevent="register" class="max-w-lg w-full flex flex-col space-y-6">
        <div>
          <label class="block">Username</label>
          <input type="text" v-model="username" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <div>
          <label class="block">Email</label>
          <input type="email" v-model="email" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <div>
          <label class="block">Password</label>
          <input type="password" v-model="password" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <div>
          <label class="block">Password Confirmation</label>
          <input type="password" v-model="passwordConfirmation" class="w-full px-4 py-3 bg-gray-200 rounded text-lg" />
        </div>
        <button type="submit" class="w-full px-4 py-3 bg-gray-800 hover:bg-gray-900 rounded text-white">Register</button>
      </form>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
