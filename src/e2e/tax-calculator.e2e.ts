import assert from 'node:assert/strict';
import test, { describe } from 'node:test';

import { Algorithm } from '../interfaces';
import { TaxCalculator } from '../tax-calculator';

describe('Tax Calculator', () => {
  describe('Validation', () => {
    test('should throw an error when unexistent algorithm selected', () => {
      const taxCalculator = new TaxCalculator('unexistent' as Algorithm);

      assert.throws(
        () => {
          taxCalculator.getPayableTax();
        },
        {
          name: 'NotFoundError',
          message: 'Algorithm selected is not implemented',
          status: 404,
        }
      );
    });

    test('should throw an error when no income is provided', () => {
      const taxCalculator = new TaxCalculator(Algorithm.RIENTRO_DEI_CERVELLI);

      assert.throws(
        () => {
          taxCalculator.getPayableTax();
        },
        {
          name: 'BadRequestError',
          message: 'Income must be a number',
          status: 400,
        }
      );
    });

    describe('should throw an error when passing an income that is not a number', () => {
      const taxCalculator = new TaxCalculator(Algorithm.RIENTRO_DEI_CERVELLI);

      const noNumbers = [{}, [1], undefined, null, 'no-number'];

      for (const noNumber of noNumbers) {
        test(`for income with value ${JSON.stringify(noNumber)}`, () => {
          taxCalculator.setIncome(noNumber as unknown as number);

          assert.throws(
            () => {
              taxCalculator.getPayableTax();
            },
            {
              name: 'BadRequestError',
              message: 'Income must be a number',
              status: 400,
            }
          );
        });
      }
    });

    test('should throw an error when passing an income that is number string', () => {
      const taxCalculator = new TaxCalculator(Algorithm.RIENTRO_DEI_CERVELLI);
      taxCalculator.setIncome('1_000' as unknown as number);

      assert.throws(
        () => {
          taxCalculator.getPayableTax();
        },
        {
          name: 'BadRequestError',
          message: 'Income must be a number',
          status: 400,
        }
      );
    });

    test('should throw an error when income is negative', () => {
      const taxCalculator = new TaxCalculator(Algorithm.RIENTRO_DEI_CERVELLI);
      taxCalculator.setIncome(-1_000);

      assert.throws(
        () => {
          taxCalculator.getPayableTax();
        },
        {
          name: 'BadRequestError',
          message: 'Income must be a positive number',
          status: 400,
        }
      );
    });
  });

  describe('Italy', () => {
    describe('Algorithm: Rientro dei cervelli', () => {
      const taxCalculator = new TaxCalculator(Algorithm.RIENTRO_DEI_CERVELLI);
      const testIncomes = [
        [0, 0, 0],
        [15_000, 1_035, 3_450],
        [15_000.5, 1_035, 3_450],
        [15_001, 1_035, 3_450],
        [15_100, 1_042, 3_477],
        [30_000, 2_070, 7_720],
        [50_000, 3_450, 15_320],
        [50_000.42, 3_450, 15_320],
        [100_000, 7_720, 36_170],
      ];

      for (const testIncome of testIncomes) {
        const [income, eligible, nonEligible] = testIncome;
        test(`Income: ${income} -> Eligible: ${eligible} | Non eligible: ${nonEligible}`, () => {
          taxCalculator.setIncome(income);

          const payableTax = taxCalculator.getPayableTax();

          assert.strictEqual(payableTax.eligible, eligible);
          assert.strictEqual(payableTax.nonEligible, nonEligible);
        });
      }
    });
  });
});
