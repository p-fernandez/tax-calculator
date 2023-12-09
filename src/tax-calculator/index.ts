import { algorithms } from './algorithms';

import { Algorithm, AlgorithmPayableTax, BadRequestError, IAlgorithm, NotFoundError } from '../interfaces';

export class TaxCalculator {
  private algorithm: IAlgorithm;

  private income: number;

  constructor(private readonly selectedAlgorithm: Algorithm) {
    this.algorithm = this.loadAlgorithm();
  }

  public getIncome(): number {
    return this.income;
  }

  public setIncome(income: number): void {
    this.income = income;
  }

  private loadAlgorithm(): IAlgorithm {
    return algorithms[this.selectedAlgorithm];
  }

  public getPayableTax(): AlgorithmPayableTax {
    this.validateInputs();

    return this.algorithm.calculatePayableTax(this.income);
  }

  private validateInputs(): void {
    if (!this.algorithm) {
      throw new NotFoundError('Algorithm selected is not implemented');
    }

    if (!Number.isFinite(this.income)) {
      throw new BadRequestError('Income must be a number');
    }

    if (Math.sign(this.income) === -1) {
      throw new BadRequestError('Income must be a positive number');
    }
  }
}
