<template>
  <div class="border-t border-gray-300">
    <div class="mx-6 lg:mx-0 my-2 lg:h-48 flex flex-col lg:flex-row gap-4">
      <!-- Colors -->
      <div class="py-6 basis-1/3 flex justify-center items-center gap-2">
        <div class="p-6 bg-skeleton rounded"></div>
        <div class="p-6 bg-skeleton rounded"></div>
        <div class="p-6 bg-skeleton rounded"></div>
      </div>

      <!-- Count -->
      <div
        class="py-6 basis-1/3 flex flex-col border-y lg:border-y-0 lg:border-x border-gray-300 justify-center items-center space-y-2"
      >
        <div class="w-56 h-20 flex flex-col justify-center items-center space-y-4">
          <div class="h-6 w-full bg-skeleton rounded"></div>
          <div class="h-4 w-full bg-skeleton rounded"></div>
        </div>
      </div>

      <!-- Amount -->
      <div class="py-6 basis-1/3 flex flex-col justify-center items-center space-y-2">
        <div class="w-56 h-20 flex flex-col justify-center items-center space-y-4">
          <div class="h-6 w-full bg-skeleton rounded"></div>
          <div class="h-4 w-full bg-skeleton rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
