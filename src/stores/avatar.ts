import { computed } from "vue";
import { useLocalStorage, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";

import type { SelectedStyleOptionsCollection } from "@/types";

import { createAvatar } from "@/utils/createAvatar";
import { getRandomOptions } from "@/utils/getRandomOptions";
import { getAvatarCombinations } from "@/utils/getAvatarCombinations";

import styleCollection from "@/config/styles";

export const useAvatarStore = defineStore("avatar", () => {
  const selectedStyleName = useLocalStorage("editor_style", Object.keys(styleCollection)[0]);

  const selectedStyleOptionsCollection = useStorage<SelectedStyleOptionsCollection>(
    `editor_avatar_options`,
    Object.keys(styleCollection).reduce<SelectedStyleOptionsCollection>((acc, key) => {
      acc[key] = getRandomOptions(styleCollection[key].options);

      return acc;
    }, {})
  );

  const selectedStyleOptions = computed({
    get: () => selectedStyleOptionsCollection.value[selectedStyleName.value],
    set: (value) => {
      selectedStyleOptionsCollection.value[selectedStyleName.value] = value;
    },
  });

  const selectedStyleCombinations = computed(() => {
    return getAvatarCombinations(
      selectedStyleName.value,
      selectedStyleOptionsCollection.value[selectedStyleName.value]
    );
  });

  const selectedStylePreview = computed(() => {
    return createAvatar(
      selectedStyleName.value,
      selectedStyleOptionsCollection.value[selectedStyleName.value]
    );
  });

  return {
    selectedStyleName,
    selectedStylePreview,
    selectedStyleCombinations,
    selectedStyleOptions,
  };
});
