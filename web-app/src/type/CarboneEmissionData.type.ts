export type IssuingCountryData = {
  entity: string;
  code: string;
  data: CarboneEmissionData[];
};

export type CarboneEmissionData = {
  year: number;
  carbonEmissionsPerCapita: number;
};
