import { getRandomBoolean } from "@/utils/getRandomBoolean";
import { getRandomNumber } from "@/utils/getRandomNumber";

export const getRandomOptions = (
  configStyleOptions: any
) => {
  const result: any = {};

  for (const key in configStyleOptions) {
    if (false === configStyleOptions.hasOwnProperty(key)) {
      continue;
    }

    const styleOption = configStyleOptions[key];
    const values = styleOption.values;

    if (getRandomBoolean(styleOption.probability)) {
      const possibleValues = values.filter((v: any) => v);
      result[key] =
        possibleValues[getRandomNumber(0, possibleValues.length - 1)];
    } else {
      result[key] = values[0];
    }
  }

  return result;
}
