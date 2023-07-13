export const useNumberHelper = () => {
  const round = (number: number, decimalPlaces: number = 2) => {
    return Number(parseFloat(number.toExponential(decimalPlaces)).toFixed(decimalPlaces));
  };

  const percent = (number: number, max: number, decimalPlaces: number = 2) => {
    return round((number / max) * 100, decimalPlaces);
  };

  return { round, percent };
};
