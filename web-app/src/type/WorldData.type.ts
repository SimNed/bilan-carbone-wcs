export type WorldData = {
  type: "FeatureCollections";
  features: WorldDataFeature[];
};

export type WorldDataFeature = {
  type: "Feature";
  properties: {
    name: string;
    nameFR: string;
    continent: string;
    code: string;
    data: { year: number; carboneEmissionsPerCapita: number }[];
  };
  geometry: { type: "Polygon"; coordinates: [string, string][] };
};

export type CarboneEmission = {
  year: number;
  carboneEmissionsPerCapita: number;
};
