import { ITaxRates } from '../../../interfaces';

export const italyTaxRates: ITaxRates = [
  { range: [0, 15_000], tax: 23 / 100 },
  { range: [15_001, 28_000], tax: 27 / 100 },
  { range: [28_001, 55_000], tax: 38 / 100 },
  { range: [55_001, 75_000], tax: 41 / 100 },
  { range: [75_001, Infinity], tax: 43 / 100 },
];
