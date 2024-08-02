import { getDataSource } from "../database";
import Ride from "./ride";
import Transportation from "./transportation";
import User from "./user";

// TODO: a retirer (Pour tester les commandes et le fonctionnement)
// test("test", () => {
//   expect(1 + 1).toEqual(2);
// });

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

async function createUser() {
  const user = new User();
  user.lastName = "test lastName";
  user.firstName = "test firstname";
  user.email = "test@example.com";
  user.hashedPassword = "password";
  await user.save();
  return user;
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
    await database.destroy();
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

  // Test deleteRide
  describe("deleteRide", () => {
    it("deletes a ride with id and returns it", async () => {
      const { Transportation } = await createTransportation();
      const owner = await createUser();

      // Create a ride
      const rideToCreate = {
        label: "Test first ride",
        distance: 120,
        date: new Date(),
        owner: owner,
        transportationId: Transportation.id,
      };
      const createdRide = await Ride.createRide(rideToCreate);

      // Verify if the ride was created
      const retrievedRide = await Ride.getRideById(createdRide.id);
      expect(retrievedRide.label).toBe(rideToCreate.label);
      expect(retrievedRide.distance).toBe(rideToCreate.distance);
      expect(retrievedRide.transportation.id).toBe(Transportation.id);

      const deletedRide = await Ride.deleteRide(createdRide.id);

      // Try to retrieve the deleted ride, expecting an error or null
      await expect(Ride.getRideById(createdRide.id)).rejects.toThrow();

      expect(deletedRide.id).toBe(createdRide.id);
    });
  });
});
