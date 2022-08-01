<script setup lang="ts">
import axios from "axios";
axios.defaults.withCredentials = true;
</script>

<script lang="ts">
import setAuth from "@/stores/auth.js";

export default {
  data() {
    return {
      csrfToken: "" as string,
      form: {
        email: "" as string,
        password: "" as string,
      },
      errors: {},
    };
  },
  methods: {
    async login() {
      try {
        await axios.get("http://localhost:8000/sanctum/csrf-cookie");
        await axios
          .post("http://localhost:8000/api/login", this.form)
          .then((response) => {
            setAuth(response.data);
            this.$router.push("/");
          });
      } catch (error) {
        this.errors = { generic: "Credentials are not valid" };
      }
    },
  },
};
</script>

<template>
  <main class="mx-4 sm:mx-8 md:mx-32">
    <h2>Login</h2>

    <form>
      <div>
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password" />
      </div>
      <button @click.prevent="login" type="submit">Login</button>
    </form>
  </main>
</template>
