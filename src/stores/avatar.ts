import { ref } from "vue";
import { defineStore } from "pinia";
import { adventurer } from "@dicebear/collection";

import { useAuthStore } from "@/stores/auth";

import { getSchemaOptions } from "@/utils/getSchemaOptions";

import type avatarOptions from "@/interfaces/avatarOptions";

export const useAvatarStore = defineStore("avatar", () => {
  const auth = useAuthStore();
  const options = getSchemaOptions(adventurer.schema);

  const availableOptions = {
    skinColor: options.skinColor,
    backgroundColor: options.backgroundColor,
    hair: options.hair,
    hairColor: options.hairColor,
    mouth: { ...options.mouth, values: ["", ...options.mouth.values] },
    eyes: { ...options.eyes, values: ["", ...options.eyes.values] },
    eyebrows: { ...options.eyebrows, values: ["", ...options.eyebrows.values] },
  };

  const defaultOptions = {
    skinColor: [availableOptions.skinColor.values[0]],
    backgroundColor: [availableOptions.backgroundColor.values[0]],
    hair: [availableOptions.hair.values[0]],
    hairColor: [availableOptions.hairColor.values[0]],
    mouth: [availableOptions.mouth.values[0]],
    eyes: [availableOptions.eyes.values[0]],
    eyebrows: [availableOptions.eyebrows.values[0]],
  } as avatarOptions;

  const selectedOptions = ref<avatarOptions>(
    auth.user.avatar ? { ...auth.user?.avatar } : { ...defaultOptions }
  );

  return {
    availableOptions,
    defaultOptions,
    selectedOptions,
  };
});
