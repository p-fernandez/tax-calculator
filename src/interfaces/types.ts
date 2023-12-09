export enum Algorithm {
  RIENTRO_DEI_CERVELLI = 'Rientro dei cervelli',
}

interface ITaxRate {
  range: [lowerRange: number, upperRange: number];
  tax: number;
}

export type ITaxRates = ReadonlyArray<ITaxRate>;

export interface IAlgorithmRientroDeiCervelliPayableTax {
  eligible: number;
  nonEligible: number;
}

export type AlgorithmPayableTax = IAlgorithmRientroDeiCervelliPayableTax;

export interface IAlgorithm {
  calculatePayableTax: (income: number) => AlgorithmPayableTax;
  name: string;
}
