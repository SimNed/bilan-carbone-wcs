import Ride from "../entities/ride";
import Transportation from "../entities/transportation";
import User from "../entities/user";

import casual from "casual";

export async function createRides(length = 1, owner: User): Promise<void> {
  if ((await Ride.count()) >= length) {
    return;
  }

  const transportations = await Transportation.find();

  const rides = Array.from({ length: length }, () => ({
    label: casual.title,
    distance: casual.integer(0, 800),
    date: new Date(
      casual.integer(2021, 2024),
      casual.integer(0, 11),
      casual.integer(1, 28)
    ),
    transportationId: casual.integer(1, transportations.length),
    owner,
  }));

  for (const ride of rides) {
    await Ride.createRide(ride);
  }
}
