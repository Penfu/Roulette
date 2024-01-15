import * as collection from "@dicebear/collection";

import type { ConfigStyleCollection } from "@/types";
import { getSchemaOptions } from "@/utils/getSchemaOptions";

const availableStyles: ConfigStyleCollection = {
  adventurer: {
    style: collection.adventurer,
    options: getSchemaOptions(collection.adventurer.schema ?? {}),
  },
};

export default availableStyles;
