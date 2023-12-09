import { Algorithm, InternalServerError, ITaxRates } from '../../interfaces';

export const calculateProgressiveTaxes = (
  algorithm: Algorithm,
  income: number,
  progressiveTaxRateLevels: ITaxRates
): number => {
  let taxes = 0;

  for (const taxRateLevel of progressiveTaxRateLevels) {
    const { range, tax } = taxRateLevel;
    const [lowerRange, upperRange] = range;

    const differenceWithLowerRange = income - lowerRange;
    if (differenceWithLowerRange <= 0) {
      continue;
    }

    const taxableAmountInLevel = income > upperRange ? upperRange - lowerRange : differenceWithLowerRange;

    if (taxableAmountInLevel < 0) {
      throw new InternalServerError(
        `Tax rate level [${lowerRange}, ${upperRange}] for algorithm ${algorithm} is wrongly configured`
      );
    }

    taxes += Math.round(taxableAmountInLevel * tax);
  }

  return taxes;
};
