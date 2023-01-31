<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";

import { useUserStore } from "../stores/user";

import Step from "@/components/register/Step.vue";
import NameStep from "@/components/register/Name.vue";
import EmailStep from "@/components/register/Email.vue";
import PasswordStep from "@/components/register/Password.vue";

const userStore = useUserStore();

const steps = [
  { component: NameStep, title: "Username" },
  { component: EmailStep,    title: "Email" },
  { component: PasswordStep, title: "Password" },
];
const step = ref(0);

const user = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const errors = ref({});

const previousStep = () => {
  if (step.value > 0)
    step.value--;
};

const nextStep = (e: any) => {
  if (step.value < steps.length - 1)
    step.value++;
  else
    register();
};

const register = async () => {
  if (user.value.password !== user.value.password_confirmation) {
    errors.value = { password: ["Passwords do not match"] };
    return;
  }

  await userStore.register(user.value.name, user.value.email, user.value.password);

  if (userStore.isAuth) {
    router.push("/");
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>

        <!-- Steps -->
        <div class="flex space-x-8">
          <step v-for="(c, index) in steps" :key="index" @set-step="step = index" :is-active="index === step" :index="index" :title="c.title" />
        </div>
      </div>

      <!-- Multi-Step form -->
      <div class="max-w-lg w-full flex flex-col space-y-6">
        <div class="h-64">
          <keep-alive>
            <component :is="steps[step].component" :user="user" />
          </keep-alive>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button @click="previousStep"
            class="w-full px-4 py-3 hover:bg-gray-50 border border-gray-400 rounded text-lg">
            Back
          </button>
          <button @click="nextStep" class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
            Next Step
          </button>
        </div>
      </div>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
