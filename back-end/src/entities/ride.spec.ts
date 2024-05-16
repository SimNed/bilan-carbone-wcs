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
      carboneEmission: 200,
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
    await database.destroy();
  });

  // Test createRide
  describe("saveNewRide", () => {
    it("creates ride and returns it", async () => {
      const { Transportation } = await createTransportation();

      const rideToCreate = {
        label: "Test ride",
        distance: 100,
        date: new Date(),
        owner: new User(), // CHECK THIS LINE
        //transportationId: 1,
      };
      const returnedRide = await Ride.createRide({
        ...rideToCreate,
        transportationId: Transportation.id,
      });

      expect(returnedRide).toMatchObject(rideToCreate);
      expect(returnedRide.transportation).toMatchObject(Transportation);

      expect(await Ride.getRideById(returnedRide.id)).toEqual(returnedRide);
    });
  });

  // Test deleteRide
  describe("deleteRide", () => {
    it("deletes a ride with id and returns it", async () => {
      const { Transportation } = await createTransportation();

      // Create a ride
      const rideToCreate = {
        label: "Test first ride",
        distance: 120,
        date: new Date(),
        owner: new User(), // CHECK THIS LINE
        transportationId: Transportation.id,
      };
      const createdRide = await Ride.createRide(rideToCreate);

      // Verifie si le trajet à été créé
      const retrieveRide = await Ride.getRideById(createdRide.id);
      expect(retrieveRide).toMatchObject({
        label: rideToCreate.label,
        distance: rideToCreate.distance,
        // date: expect.any(Date),
      });
      expect(retrieveRide.transportation).toMatchObject(Transportation);

      const deletedRide = await Ride.deleteRide(createdRide.id);

      // Tente de récupérer le trajet supprimé, (s'attendant à une erreur ou a null)
      await expect(Ride.getRideById(createdRide.id)).rejects.toThrow();

      expect(deletedRide.id).toBe(createdRide.id);
    });
  });
});
