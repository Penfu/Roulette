import { createAvatar as createAvatarCore } from "@dicebear/core";
import type { Result } from "@dicebear/core";

import { getAvatarOptions } from "@/utils/getAvatarOptions";
import availableStyles from "@/config/styles";

export const createAvatar = (
  styleName: string,
  options: any,
): Result => {
  return createAvatarCore(
    availableStyles[styleName].style,
    getAvatarOptions(styleName, options)
  );
}
