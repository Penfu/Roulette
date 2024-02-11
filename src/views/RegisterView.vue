<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import router from '@/router';

import { useAuthStore } from '@/stores/auth';

import StepButton from '@/components/register/StepButton.vue';
import NameField from '@/components/register/NameField.vue';
import EmailField from '@/components/register/EmailField.vue';
import PasswordField from '@/components/register/PasswordField.vue';
import PendingButton from '@/components/PendingButton.vue';

const { register } = useAuthStore();

const selectedTab = ref(0);

const changeTab = (index: number) => {
  selectedTab.value = index;
};

const user = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
});

type Errors = {
  name: string[];
  email: string[];
  password: string[];
};

const errors = ref<Errors>({
  name: [],
  email: [],
  password: [],
});

const isPending = ref(false);
const isLastStep = computed(() => selectedTab.value === 2);
const canSubmit = computed(() => {
  return (
    user.value.name.length > 0 &&
    user.value.email.length > 0 &&
    user.value.password.length > 0 &&
    user.value.passwordConfirmation.length > 0
  );
});

const handlePreviousStep = () => {
  if (selectedTab.value > 0) {
    selectedTab.value--;
  }
};

const handleNextStep = () => {
  if (canSubmit.value) {
    handleRegister();
  } else {
    selectedTab.value++;
  }
};

const handleRegister = async () => {
  isPending.value = true;
  const response = await register(user.value.name, user.value.email, user.value.password);

  if (response.success) {
    nextTick(() => {
      router.push('/');
    });
  } else {
    isPending.value = false;
    errors.value = response.errors as Errors;
  }
};
</script>

<template>
  <main class="flex justify-center items-center">
    <section class="w-full sm:max-w-xl py-12 space-y-12 sm:space-y-20">
      <h2 class="text-4xl sm:text-5xl text-center font-semibold uppercase">Register</h2>

      <div class="h-[36rem] flex flex-col space-y-8">
        <form
          @submit.prevent="handleRegister"
          @keypress.enter.prevent="handleNextStep"
          class="grow flex flex-col space-y-14"
        >
          <TabGroup :selectedIndex="selectedTab" @change="changeTab">
            <TabList class="flex justify-center space-x-8">
              <Tab as="template" v-slot="{ selected }">
                <StepButton :index="0" :selected="selected" :hasError="errors.name.length > 0" name="Name" />
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <StepButton :index="1" :selected="selected" :hasError="errors.email.length > 0" name="Email" />
              </Tab>
              <Tab as="template" v-slot="{ selected }">
                <StepButton :index="2" :selected="selected" :hasError="errors.password.length > 0" name="Password" />
              </Tab>
            </TabList>

            <TabPanels as="div" class="grow">
              <TabPanel>
                <span class="text-red">{{ errors.name[0] }}</span>
                <NameField v-model:name="user.name" />
              </TabPanel>
              <TabPanel>
                <span class="text-red">{{ errors.email[0] }}</span>
                <EmailField v-model:email="user.email" />
              </TabPanel>
              <TabPanel>
                <span class="text-red">{{ errors.password[0] }}</span>
                <PasswordField
                  v-model:password="user.password"
                  v-model:passwordConfirmation="user.passwordConfirmation"
                />
              </TabPanel>
            </TabPanels>
          </TabGroup>

          <!-- Buttons -->
          <div class="flex flex-col xs:flex-row xs:justify-end gap-4 text-lg">
            <button
              v-if="selectedTab > 0"
              type="button"
              @click="handlePreviousStep"
              class="btn-secondary w-full transition-all duration-200 ease-in-out"
              :class="[isLastStep ? 'xs:w-1/3' : 'xs:w-1/2']"
            >
              Back
            </button>
            <PendingButton
              type="button"
              :pending="isPending"
              :disabled="isLastStep && !canSubmit"
              @click="handleNextStep()"
              class="btn-primary w-full transition-all duration-200 ease-in-out"
              :class="{
                'xs:w-full': selectedTab === 0,
                'xs:w-1/2': selectedTab === 1,
                'xs:w-2/3': isLastStep,
              }"
            >
              {{ isLastStep ? 'Register' : 'Next Step' }}
            </PendingButton>
          </div>
        </form>

        <div class="flex flex-wrap justify-center gap-2 text-gray-700">
          <span>Already have an account?</span>
          <router-link to="/login" class="text-green hover:text-green-dark font-semibold">Login</router-link>
        </div>
      </div>
    </section>
  </main>
</template>
