<script setup lang="ts">
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import router from "@/router";
import Step from "@/components/form/Step.vue";

const userStore = useUserStore();
const step = ref(1);
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const errors = ref({});

const previousStep = () => {
  if (step.value > 1) step.value--;
};

const nextStep = (e: any) => {
  if (step.value < 3) {
    e.preventDefault();
    step.value++;
  }
};

const register = async () => {
  if (password.value !== passwordConfirmation.value) {
    errors.value = { password: ["Passwords do not match"] };
    return;
  }

  await userStore.register(username.value, email.value, password.value);

  if (userStore.isAuth) {
    router.push("/");
  }
};
</script>

<template>
  <main class="mx-4 md:mx-8 lg:mx-16 xl:mx-32">
    <div
      class="py-16 w-full flex items-center justify-center flex-col space-y-4"
    >
      <div class="max-w-lg w-full space-y-12">
        <h2 class="text-3xl font-semibold uppercase text-center">Register</h2>

        <!-- Steps -->
        <div class="flex space-x-8">
          <step
            @set-step="step = 1"
            :step="step"
            :number="1"
            title="Username"
          />
          <step @set-step="step = 2" :step="step" :number="2" title="Email" />
          <step
            @set-step="step = 3"
            :step="step"
            :number="3"
            title="Password"
          />
        </div>
      </div>

      <!-- Multi-Step form -->
      <form
        @submit.prevent="register"
        class="max-w-lg w-full flex flex-col space-y-6"
      >
        <div class="h-64">
          <!-- Step 1 -->
          <div v-if="step === 1">
            <div>
              <label class="block py-2">Username</label>
              <input
                type="text"
                v-model="username"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
              />
            </div>
          </div>

          <!-- Step 2 -->
          <div v-if="step === 2">
            <div>
              <label class="block py-2">Email</label>
              <input
                type="email"
                v-model="email"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
              />
            </div>
          </div>

          <!-- Step 3 -->
          <div v-if="step === 3" class="flex flex-col space-y-4">
            <div>
              <label class="block py-2">Password</label>
              <input
                type="password"
                v-model="password"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
              />
            </div>
            <div>
              <label class="block py-2">Password Confirmation</label>
              <input
                type="password"
                v-model="passwordConfirmation"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg"
              />
            </div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex space-x-4">
          <button
            @click="previousStep"
            class="w-full px-4 py-3 hover:bg-gray-50 border border-gray-400 rounded text-lg"
          >
            Back
          </button>
          <button
            @click="nextStep"
            class="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded text-lg"
          >
            Next Step
          </button>
        </div>
      </form>

      <router-link to="/login" class="text-gray-600 hover:text-gray-800">
        Already register ?
      </router-link>
    </div>
  </main>
</template>
