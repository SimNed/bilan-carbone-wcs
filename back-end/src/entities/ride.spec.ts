import { DataSource } from "typeorm";
import { getDataSource, getNewDataSource } from "../database/database";
import { createUser } from "../fixtures/user";
import Ride from "./ride";
import Transportation from "./transportation";
import User from "./user";

async function createTransportation() {
  const transportation = await Transportation.createTransportationIfNotExisting(
    {
      id: 1,
      label: "voiture",
      carbonEmissionsByGrPerKm: 200,
    }
  );
  return { Transportation: transportation };
}

describe("Ride", () => {
  beforeEach(async () => {
    const database = await getDataSource();
    for (const entity of database.entityMetadatas) {
      const repository = database.getRepository(entity.name);
      await repository.query(
        `TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
      );
    }
  });

  afterAll(async () => {
    const database = await getDataSource();
    if (database) await database.destroy();
  });

  // Test createRide
  describe("saveNewRide", () => {
    it("creates ride and returns it", async () => {
      const { Transportation } = await createTransportation();
      const owner = await createUser();

      const rideToCreate = {
        label: "Test ride",
        distance: 100,
        date: new Date(),
        owner: owner,
        transportationId: Transportation.id,
      };
      const returnedRide = await Ride.createRide(rideToCreate);

      expect(returnedRide.label).toBe(rideToCreate.label);
      expect(returnedRide.distance).toBe(rideToCreate.distance);
      expect(returnedRide.owner.id).toBe(owner.id);
      expect(returnedRide.transportation.id).toBe(Transportation.id);

      const retrievedRide = await Ride.getRideById(returnedRide.id);
      expect(retrievedRide).toMatchObject(returnedRide);
    });
  });

  describe("deleteRide", () => {
    it("deletes a ride with id and returns it", async () => {
      const { Transportation } = await createTransportation();
      const owner = await createUser();

      const rideToCreate = {
        label: "Test first ride",
        distance: 120,
        date: new Date(),
        owner: owner,
        transportationId: Transportation.id,
      };
      const createdRide = await Ride.createRide(rideToCreate);

      const retrievedRide = await Ride.getRideById(createdRide.id);
      expect(retrievedRide.label).toBe(rideToCreate.label);
      expect(retrievedRide.distance).toBe(rideToCreate.distance);
      expect(retrievedRide.transportation.id).toBe(Transportation.id);

      const deletedRide = await Ride.deleteRide(createdRide.id);

      await expect(Ride.getRideById(createdRide.id)).rejects.toThrow();

      expect(deletedRide.id).toBe(createdRide.id);
    });
  });
});
