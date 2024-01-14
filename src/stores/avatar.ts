import { computed } from "vue";
import { useLocalStorage, useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import type {
  SelectedStyleCombinations,
  SelectedStyleOptionsCollection,
} from "@/types";

import getRandomOptions from "@/utils/getRandomOptions";
import { createAvatar } from "@/utils/createAvatar";
import getAvatarCombinations from "@/utils/getAvatarCombinations";

import styleCollection from "@/config/styles";

const useAvatarStore = defineStore("avatar", () => {
  const selectedStyleName = useLocalStorage(
    "editor_style",
    Object.keys(styleCollection)[0]
  );

  const selectedStyleOptionsCollection =
    useStorage<SelectedStyleOptionsCollection>(
      `editor_avatar_options`,
      Object.keys(styleCollection).reduce<SelectedStyleOptionsCollection>(
        (acc, key) => {
          acc[key] = getRandomOptions(styleCollection[key].options);

          return acc;
        },
        {}
      )
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

  const availableStyles = computed(() => {
    const result: SelectedStyleCombinations = {};

    for (const key in styleCollection) {
      if (false === styleCollection.hasOwnProperty(key)) {
        continue;
      }

      result[key] = [
        {
          active: selectedStyleName.value === key,
          avatar: createAvatar(key, selectedStyleOptionsCollection.value[key]),
          options: selectedStyleOptionsCollection.value[key],
        },
      ];
    }

    return result;
  });

  const selectedStylePreview = computed(() => {
    return createAvatar(
      selectedStyleName.value,
      selectedStyleOptionsCollection.value[selectedStyleName.value]
    );
  });

  return {
    availableStyles,
    selectedStyleName,
    selectedStylePreview,
    selectedStyleCombinations,
    selectedStyleOptions,
  };
});

export default useAvatarStore;
