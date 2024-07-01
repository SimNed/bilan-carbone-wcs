import { SearchRidesQuery } from "@/gql/graphql";

export function checkRideMonthAndYearEquality(
  rideDate: any,
  month: number,
  year: number
) {
  return (
    new Date(rideDate).getMonth() === month &&
    new Date(rideDate).getFullYear() === year
  );
}

export function checkRideDayMonthAndYearEquality(
  rideDate: any,
  day: number,
  month: number,
  year: number
) {
  return (
    new Date(rideDate).getDate() === day &&
    new Date(rideDate).getMonth() === month &&
    new Date(rideDate).getFullYear() === year
  );
}

export function getTotalEmissionsByDayAndTransportation(
  data: SearchRidesQuery,
  transportationLabel: string,
  day: number,
  month: number,
  year: number
) {
  if (!data) return 0;
  return data.searchRides
    .filter(
      (ride) =>
        ride.transportation.label === transportationLabel &&
        checkRideDayMonthAndYearEquality(ride.date, day, month, year)
    )
    .reduce(
      (acc, ride) =>
        acc + (ride.distance * ride.transportation.carboneEmission) / 1000,
      0
    );
}
