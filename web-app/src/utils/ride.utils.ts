import { Ride, SearchRidesQuery } from "@/gql/graphql";
import { RideData } from "@/type/RideData.type";

export function checkRideYearEquality(rideDate: any, year: number) {
  return new Date(rideDate).getFullYear() === year;
}

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

export function getRideEmissionsInKg(ride: RideData) {
  return (ride.distance * ride.transportation.carbonEmissionsByGrPerKm) / 1000;
}

export function getTotalEmissions(rides: RideData[]) {
  return rides.reduce((acc, ride) => acc + getRideEmissionsInKg(ride), 0);
}

export function getTotalEmissionsByTransportation(
  rides: Ride[],
  transportationLabel: string
) {
  if (!rides || rides.length === 0) return 0;
  return rides
    .filter((ride) => ride.transportation.label === transportationLabel)
    .reduce((acc, ride) => acc + getRideEmissionsInKg(ride), 0);
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
    .reduce((acc, ride) => acc + getRideEmissionsInKg(ride), 0);
}

export function getTotalEmissionsByMonthAndTransportation(
  data: SearchRidesQuery,
  transportationLabel: string,
  month: number,
  year: number
) {
  if (!data) return 0;
  return data.searchRides
    .filter(
      (ride) =>
        ride.transportation.label === transportationLabel &&
        checkRideMonthAndYearEquality(ride.date, month, year)
    )
    .reduce((acc, ride) => acc + getRideEmissionsInKg(ride), 0);
}

export function getAllMonthsEmissionsByYearAndTransportation(
  data: SearchRidesQuery,
  year: number,
  transportationLabel: string
) {
  const accumulator = Array(12).fill(0);

  return data.searchRides
    .filter(
      (ride) =>
        ride.transportation.label === transportationLabel &&
        checkRideYearEquality(ride.date, year)
    )
    .reduce((acc, ride) => {
      acc[new Date(ride.date).getMonth()] += getRideEmissionsInKg(ride);
      return acc;
    }, accumulator);
}
