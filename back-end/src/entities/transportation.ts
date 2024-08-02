import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, Float, Int } from "type-graphql";
import { CreateOrUpdateTransportation } from "./transportation.args";
import Ride from "./ride";

@Entity()
@ObjectType()
class Transportation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id!: number;

  @Column()
  @Field()
  label!: string;

  @Column()
  @Field(() => Float)
  carbonEmissionsByGrPerKm!: number;

  @OneToMany(() => Ride, (ride) => ride.transportation)
  @Field(() => [Ride])
  rides!: Ride[];

  constructor(transportation?: Partial<Transportation>) {
    super();

    if (transportation) {
      if (!transportation.label) {
        throw new Error("Label is required");
      }
      if (!transportation.carbonEmissionsByGrPerKm) {
        throw new Error("Label is required");
      }
      this.label = transportation.label;
      this.carbonEmissionsByGrPerKm = transportation.carbonEmissionsByGrPerKm;
    }
  }

  static async initializeTransportations(): Promise<void> {
    await Transportation.createTransportationIfNotExisting({
      label: "train",
      carbonEmissionsByGrPerKm: 50,
    });
    await Transportation.createTransportationIfNotExisting({
      label: "bus",
      carbonEmissionsByGrPerKm: 90,
    });
    await Transportation.createTransportationIfNotExisting({
      label: "voiture",
      carbonEmissionsByGrPerKm: 135,
    });
    await Transportation.createTransportationIfNotExisting({
      id: 5,
      label: "avion",
      carbonEmissionsByGrPerKm: 175,
    });
  }

  static async getTransportations(): Promise<Transportation[]> {
    const transportations = await Transportation.find();
    return transportations;
  }

  static async getTransportationById(id: number): Promise<Transportation> {
    const transportation = await Transportation.findOne({
      where: { id },
    });
    if (!transportation) {
      throw new Error(`Transporation with ID ${id} does not exist.`);
    }
    return transportation;
  }

  static async createTransportationIfNotExisting(
    transportationData: Partial<Transportation>
  ): Promise<Transportation> {
    if (!transportationData.label) {
      throw new Error("Label is required");
    }
    const existingTransportation = await Transportation.getTransportationByName(
      transportationData.label
    );
    if (existingTransportation) {
      return existingTransportation;
    }
    const newTransportation = new Transportation(transportationData);
    const savedTransportation = await newTransportation.save();
    return savedTransportation;
  }

  static async updateTransportation(
    id: number,
    partialTransportation: CreateOrUpdateTransportation
  ): Promise<Transportation> {
    const transportation = await Transportation.getTransportationById(id);
    Object.assign(transportation, partialTransportation);
    await transportation.save();
    transportation.reload();
    return transportation;
  }

  static async deleteTransportation(id: number): Promise<Transportation> {
    const transportation = await Transportation.getTransportationById(id);
    await Transportation.delete(id);
    return transportation;
  }

  private static async getTransportationByName(
    label: string
  ): Promise<Transportation | null> {
    const transportation = await Transportation.findOneBy({ label });
    return transportation;
  }
}

export default Transportation;
