export type Company = {
  name: string;
  license: string;
  charges: Charge[];
  currencyCode: string;
  decimalPlaces: number;
};

export type Charge = {
  title: string;
  isPercentage: boolean;
  value: number;
};
