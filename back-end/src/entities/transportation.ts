import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from 'type-graphql';

import { CreateOrUpdateTransportation } from './transportation.args';
import Ride from './ride';

type TransportationArgs = CreateOrUpdateTransportation;

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
  carboneEmission!: number;

  @OneToMany(() => Ride, (ride) => ride.transportation)
  @Field(() => [Ride])
  rides!: Ride[];

  constructor(transportation?: TransportationArgs) {
    super();

    if (transportation) {
      this.label = transportation.label;
      this.carboneEmission = transportation.carboneEmission;
    }
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

  static async createTransportation(
    transportationData: TransportationArgs
  ): Promise<Transportation> {
    const newtTransportation = new Transportation(transportationData);
    const savedTransportation = await newtTransportation.save();
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
}

export default Transportation;