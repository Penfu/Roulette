<script lang="ts">
export default {
  name: "Dropdown",
  data() {
    return {
      open: false
    };
  },

  created() {
    window.addEventListener("click", this.close);
  },

  beforeDestroy() {
    window.removeEventListener("click", this.close);
  },

  methods: {
    toggle() {
      this.open = !this.open;
    },

    close(e: any) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    }
  }
};
</script>

<template>
  <div>
    <!-- Dropdown toggle button -->
    <button @click="open = !open"
      class="p-2 flex items-center rounded border border-gray-300 shadow-sm bg-white hover:bg-gray-50 text-gray-800">
      <slot name="header"></slot>
      <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div v-show="open" class="absolute right-0 py-2 mt-2 w-44 bg-white rounded border border-gray-300 shadow">
      <slot name="body"></slot>
    </div>
  </div>
</template>
