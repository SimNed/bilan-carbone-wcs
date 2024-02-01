import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';

import { CreateOrUpdateTransportation } from './transportation.args';
import Ride from './ride';

type TransportationArgs = CreateOrUpdateTransportation;

@Entity()
@ObjectType()
class Transportation extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  label!: string;

  @Column()
  @Field(() => Float)
  carboneEmission!: number;

  // @OneToMany(() => Ride, (ride) => ride.transportation)
  // @Field(() => [Ride])
  // rides!: Ride[];

  constructor(transportation?: Partial<Transportation>) {
    super();

    if (transportation) {
      if (!transportation.label) {
        throw new Error('Label is required');
      }
      if (!transportation.carboneEmission) {
        throw new Error('Label is required');
      }
      this.label = transportation.label;
      this.carboneEmission = transportation.carboneEmission;
    }
  }

  static async initializeTransportations(): Promise<void> {
    await Transportation.createTransportationIfNotExisting({
      id: 1,
      label: 'voiture',
      carboneEmission: 200,
    });
    await Transportation.createTransportationIfNotExisting({
      id: 2,
      label: 'bus',
      carboneEmission: 100,
    });
    await Transportation.createTransportationIfNotExisting({
      id: 4,
      label: 'train',
      carboneEmission: 10,
    });
    await Transportation.createTransportationIfNotExisting({
      id: 5,
      label: 'avion',
      carboneEmission: 285,
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
      throw new Error('Label is required');
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
