export type RideData = {
  __typename?: "Ride" | undefined;
  id: string;
  label: string;
  distance: number;
  date: any;
  transportation: {
    __typename?: "Transportation" | undefined;
    id: number;
    label: string;
    carbonEmissionsByGrPerKm: number;
  };
};
