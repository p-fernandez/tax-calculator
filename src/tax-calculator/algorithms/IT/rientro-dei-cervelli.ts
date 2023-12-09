import { italyTaxRates } from './tax-rates';
import { calculateProgressiveTaxes } from '../progressive-taxes';

import { Algorithm, IAlgorithmRientroDeiCervelliPayableTax } from '../../../interfaces';

const name = Algorithm.RIENTRO_DEI_CERVELLI;

const calculateEligiblePayableTax = (income: number): number => {
  const RATE_TAXABLE_INCOME_REDUCTION = 30 / 100;

  const taxableIncome = Math.round(income * RATE_TAXABLE_INCOME_REDUCTION);

  return calculateProgressiveTaxes(name, taxableIncome, italyTaxRates);
};

const calculateNonEligiblePayableTax = (income: number): number => {
  return calculateProgressiveTaxes(name, income, italyTaxRates);
};

export const rientroDeiCervelli = {
  name,
  calculatePayableTax: (income: number): IAlgorithmRientroDeiCervelliPayableTax => {
    const eligible = calculateEligiblePayableTax(income);
    const nonEligible = calculateNonEligiblePayableTax(income);

    return { eligible, nonEligible };
  },
};
