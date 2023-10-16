<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

import Step from "@/components/register/Step.vue";
import NameStep from "@/components/register/Name.vue";
import EmailStep from "@/components/register/Email.vue";
import PasswordStep from "@/components/register/Password.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const userStore = useAuthStore();

const steps = [
  { component: NameStep, title: "Username" },
  { component: EmailStep, title: "Email" },
  { component: PasswordStep, title: "Password" },
];

const step = ref(0);

const errorsByStep = computed(() => {
  return [
    userStore.authErrors.name,
    userStore.authErrors.email,
    userStore.authErrors.password,
  ];
});

const user = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const isReadyToSubmit = computed(() => {
  return step.value === steps.length - 1;
});
const isValidating = ref(false);

onMounted(() => {
  userStore.authErrors = {
    name: [],
    email: [],
    password: [],
  };
});

const previousStep = () => {
  if (step.value > 0)
    step.value--;
};

const nextStep = () => {
  if (isReadyToSubmit.value)
    return;

  step.value++;
};

const register = async () => {
  if (user.value.password !== user.value.passwordConfirmation) {
    userStore.authErrors.password.push("Passwords do not match");
    return;
  }

  isValidating.value = true;
  await userStore.register(user.value.name, user.value.email, user.value.password);

  if (userStore.isAuth) router.push("/")
  else isValidating.value = false;
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="py-16 w-full flex items-center justify-center flex-col space-y-4">
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>

        <!-- Steps -->
        <div class="flex justify-center gap-6 md:gap-8">
          <step v-for="(c, index) in steps" :key="index" @set-step="step = index" :is-active="index === step"
            :index="index" :title="c.title" :hasError="errorsByStep[index].length > 0" />
        </div>
      </div>

      <!-- Multi-Step form -->
      <div class="max-w-lg w-full flex flex-col space-y-6">
        <div class="h-64">
          <keep-alive>
            <component :is="steps[step].component" :user="user" :errors="userStore.authErrors" />
          </keep-alive>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button @click="previousStep" class="grow px-4 py-3 hover:bg-gray-50 border border-gray-400 rounded text-lg">
            Back
          </button>

          <button v-if="!isReadyToSubmit" @click="nextStep()"
            class="basis-1/2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg">
            Next Step
          </button>
          <button v-else @click="register()"
            class="relative flex justify-center items-center basis-4/5 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg transition-width duration-500">
            Register
            <SpinnerIcon v-if="isValidating" class="absolute right-4" />
          </button>
        </div>
      </div>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
