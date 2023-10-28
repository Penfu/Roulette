<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import router from "@/router";

import { useAuthStore } from "@/stores/auth";

import StepBtn from "@/components/register/StepBtn.vue";
import NameField from "@/components/register/NameField.vue";
import EmailField from "@/components/register/EmailField.vue";
import PasswordField from "@/components/register/PasswordField.vue";
import SpinnerIcon from "@/components/icons/SpinnerIcon.vue";

const { register } = useAuthStore();

type Errors = {
  name: string[];
  email: string[];
  password: string[];
};

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
      { component: NameField, name: "Name", errors: errors.value.name },
      { component: EmailField, name: "Email", errors: errors.value.email },
      { component: PasswordField, name: "Password", errors: errors.value.password },
    ] as Step[]
);

const user = ref({
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
});
const errors = ref({} as Errors);

const isReadyToSubmit = computed(() => {
  return activeStepIndex.value === steps.value.length - 1;
});
const isValidating = ref(false);

const handlePreviousStep = () => {
  if (activeStepIndex.value > 0) activeStepIndex.value--;
};

const handleNextStep = () => {
  if (!isReadyToSubmit.value) activeStepIndex.value++;
};

const handleRegister = async () => {
  // Local validation
  if (user.value.password !== user.value.passwordConfirmation) {
    errors.value.password.push("Passwords do not match");
    return;
  }

  // Server validation
  isValidating.value = true;
  const response = await register(user.value.name, user.value.email, user.value.password);

  if (response.success) {
    nextTick(() => {
      router.push("/");
    });
  } else {
    isValidating.value = false;
    errors.value = response.errors as Errors;
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div class="mx-auto max-w-lg py-16 space-y-12">
      <h2 class="text-center text-5xl font-semibold uppercase">Register</h2>

      <!-- Multi-Step form -->
      <form @submit.prevent="handleRegister" class="space-y-8">
        <!-- Steps -->
        <div class="flex justify-center space-x-6 md:space-x-8">
          <StepBtn
            v-for="(step, index) in steps"
            :key="step.name"
            @set-step="activeStepIndex = index"
            :is-active="index === activeStepIndex"
            :index="index"
            :name="step.name"
            :hasError="step.errors !== undefined"
          />
        </div>

        <div class="h-64 space-y-2">
          <span class="text-red-500">{{ activeStep.errors?.[0] }}</span>
          <component :is="activeStep.component" :user="user" />
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4 text-lg">
          <button
            v-if="activeStepIndex > 0"
            type="button"
            @click="handlePreviousStep"
            class="w-full px-4 py-3 hover:bg-gray-50 border border-gray-400 rounded"
            :class="{ 'basis-2/5': isReadyToSubmit }"
          >
            Back
          </button>
          <button
            v-if="!isReadyToSubmit"
            type="button"
            @click="handleNextStep()"
            class="btn-primary w-full"
          >
            Next Step
          </button>
          <button
            v-else
            type="submit"
            class="btn-primary w-full relative flex justify-center items-center"
          >
            Register
            <SpinnerIcon v-if="isValidating" class="absolute right-4" />
          </button>
        </div>
      </form>

      <router-link to="/login" class="block text-center text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
