import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { adventurer } from "@dicebear/collection";
import { createAvatar, type Options } from "@dicebear/core";

import { useAuthStore } from "@/stores/auth";

import { getSchemaOptions } from "@/utils/getSchemaOptions";

export const useAvatarStore = defineStore("avatar", () => {
  const auth = useAuthStore();
  const options = getSchemaOptions(adventurer.schema);

  const availableOptions = {
    backgroundColor: options.backgroundColor,
    hair: options.hair,
    hairColor: options.hairColor,
    mouth: options.mouth,
    eyes: options.eyes,
    eyebrows: options.eyebrows,
    skinColor: options.skinColor,
  };

  const selectedOptions = ref({
    backgroundColor: auth.user.avatar?.backgroundColor ?? [availableOptions.backgroundColor[0]],
    hair: auth.user.avatar?.hair ?? [availableOptions.hair[0]],
    hairColor: auth.user.avatar?.hairColor ?? [availableOptions.hairColor[0]],
    mouth: auth.user.avatar?.mouth ?? [availableOptions.mouth[0]],
    eyes: auth.user.avatar?.eyes ?? [availableOptions.eyes[0]],
    eyebrows: auth.user.avatar?.eyebrows ?? [availableOptions.eyebrows[0]],
    skinColor: auth.user.avatar?.skinColor ?? [availableOptions.skinColor[0]],
    features: [],
    glasses: [],
    earrings: [],
  } as Partial<Options>);

  const selectedOptionsPreview = computed(() =>
    createAvatar(adventurer, selectedOptions.value)
  );

  return {
    availableOptions,
    selectedOptions,
    selectedOptionsPreview,
  };
});
