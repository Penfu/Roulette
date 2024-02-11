<script setup lang="ts">
import { TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

defineProps<{
  onClose: () => void;
}>();
</script>

<template>
  <Dialog as="div" @close="onClose" class="relative z-10">
    <TransitionChild
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
      as="template"
    >
      <div class="fixed inset-0 bg-black/75" />
    </TransitionChild>

    <div class="fixed inset-0 flex justify-center items-end sm:items-center">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="translate-y-12 sm:opacity-0 sm:translate-y-0 sm:scale-95"
        enter-to="opacity-100 translate-y-0 sm:scale-100"
        leave="duration-200 ease-in"
        leave-from="translate-y-0 sm:opacity-100 sm:scale-100"
        leave-to="translate-y-12 sm:opacity-0 sm:translate-y-0 sm:scale-95"
        as="template"
      >
        <DialogPanel
          class="sm:mx-8 px-6 py-8 md:px-8 md:py-10 max-w-2xl w-full bg-gray rounded-t-3xl sm:rounded-lg space-y-12"
        >
          <DialogTitle as="h2" class="text-3xl font-bold">In order to play, you need to login</DialogTitle>

          <p class="text-gray-700">
            For a better experience, please login before placing your bet. Keeping track of your wins is more fun, don't
            worry coins are free !
          </p>

          <RouterLink to="/login" class="block btn-primary w-full text-center">Login</RouterLink>
        </DialogPanel>
      </TransitionChild>
    </div>
  </Dialog>
</template>
