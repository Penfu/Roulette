import { createAvatar as createAvatarCore } from "@dicebear/core";
import type { Result } from "@dicebear/core";

import type { SelectedStyleOptions } from "@/types";

import { getAvatarOptions } from "@/utils/getAvatarOptions";
import availableStyles from "@/config/styles";

export const createAvatar = (
  styleName: string,
  options: SelectedStyleOptions
): Result => {
  return createAvatarCore(
    availableStyles[styleName].style,
    getAvatarOptions(styleName, options)
  );
}
