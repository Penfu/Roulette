<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

import StepBtn from "@/components/register/StepBtn.vue";
import UsernameField from "@/components/register/UsernameField.vue";
import EmailField from "@/components/register/EmailField.vue";
import PasswordField from "@/components/register/PasswordField.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const userStore = useAuthStore();

type Step = {
  component: any;
  name: string;
  errors: string[];
};

const activeStepIndex = ref(0);
const activeStep = computed(() => steps.value[activeStepIndex.value]);

const steps = computed(
  () =>
    [
      { component: UsernameField, name: "Username", errors: userStore.authErrors.name },
      { component: EmailField, name: "Email", errors: userStore.authErrors.email },
      { component: PasswordField, name: "Password", errors: userStore.authErrors.password },
    ] as Step[]
);

const user = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});

const isReadyToSubmit = computed(() => {
  return activeStepIndex.value === steps.value.length - 1;
});
const isValidating = ref(false);

onMounted(() => {
  userStore.authErrors = { name: [], email: [], password: [] };
});

const previousStep = () => {
  if (activeStepIndex.value > 0) activeStepIndex.value--;
};

const nextStep = () => {
  if (!isReadyToSubmit.value) activeStepIndex.value++;
};

const register = async () => {
  if (user.value.password !== user.value.passwordConfirmation) {
    userStore.authErrors.password.push("Passwords do not match");
    return;
  }

  isValidating.value = true;
  await userStore.register(user.value.name, user.value.email, user.value.password);

  if (userStore.isAuth) router.push("/");
  else isValidating.value = false;
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="mx-auto max-w-lg py-16 flex flex-col justify-center items-center space-y-12">
      <h2 class="text-5xl font-semibold uppercase">Register</h2>

      <!-- Multi-Step form -->
      <form @submit.prevent="register" class="w-full space-y-8">
        <!-- Steps -->
        <div class="flex justify-center space-x-6 md:space-x-8">
          <StepBtn
            v-for="(step, index) in steps"
            :key="step.name"
            @set-step="activeStepIndex = index"
            :is-active="index === activeStepIndex"
            :index="index"
            :name="step.name"
            :hasError="step.errors.length > 0"
          />
        </div>

        <div class="h-64 space-y-2">
          <span class="text-red-500">{{ activeStep.errors?.[0] }}</span>
          <component :is="activeStep.component" :user="user" />
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            type="button"
            @click="previousStep"
            class="grow px-4 py-3 hover:bg-gray-50 border border-gray-400 rounded text-lg"
          >
            Back
          </button>
          <button
            v-if="!isReadyToSubmit"
            type="button"
            @click="nextStep()"
            class="basis-1/2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg"
          >
            Next Step
          </button>
          <button
            v-else
            type="button"
            @click="register()"
            class="relative flex justify-center items-center basis-4/5 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg transition-width duration-500"
          >
            Register
            <SpinnerIcon v-if="isValidating" class="absolute right-4" />
          </button>
        </div>
      </form>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
