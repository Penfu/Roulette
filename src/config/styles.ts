import * as collection from "@dicebear/collection";

import getSchemaOptions from "@/utils/getSchemaOptions";
import type { ConfigStyleCollection } from "@/types";

const availableStyles: ConfigStyleCollection = {
  adventurer: {
    style: collection.adventurer,
    options: getSchemaOptions(collection.adventurer.schema ?? {}),
  },
};

export default availableStyles;
