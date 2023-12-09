import { Algorithm } from './interfaces';
import { TaxCalculator } from './tax-calculator';

console.log('Tax Calculator');

const ALGORITHM = Algorithm.RIENTRO_DEI_CERVELLI; // Set the desired algorithm. Only one implemented so far.
const INCOME = 9_999; // Set desired income

const taxCalculator = new TaxCalculator(ALGORITHM);
taxCalculator.setIncome(INCOME);
const taxes = taxCalculator.getPayableTax();

console.log({ taxes });
