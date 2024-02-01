import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

import { CreateOrUpdateTransportation } from "./transportation.args";
import Ride from "./ride";

type TransportationArgs = CreateOrUpdateTransportation & {
  // owner: User;
};

@Entity()
@ObjectType()
class Transportation extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column()
  @Field()
  label!: string;

  @Column()
  @Field(() => Float)
  carboneEmission!: number;

  @OneToMany(() => Ride, (ride) => ride.transportation)
  rides!: Ride[];

  constructor(transportation?: TransportationArgs) {
    super();

    if (transportation) {
      this.label = transportation.label;
      this.carboneEmission = transportation.carbone;
    }
  }

  static async getTransportations(): Promise<Transportation[]>{
    const transportation = await Transportation.find()
    return transportation
  }

  static async getTransportationById(id: string): Promise<Transportation>{
    const transportation = await Transportation.findOne({ where: { id } })
    
    if(!transportation)
      throw new Error(`Transportation with ID ${id} does not exist`)
    
    return transportation
  }

  static async saveTransportation(transportationData: TransportationArgs): Promise<Transportation>{
    const transportation = new Transportation(transportationData)
    const savedTransportation = await transportation.save()
    
    return savedTransportation
  }

  static async updateTransportation(id: string, partialTransportation: CreateOrUpdateTransportation): Promise<Transportation> {
    const transportation = await Transportation.getTransportationById(id);
    Object.assign(transportation, partialTransportation);

    await transportation.save();
    transportation.reload();
    
    return transportation;
  }

  static async deleteTransportation(id: string): Promise<Transportation> {
    const transportation = await Transportation.getTransportationById(id);
    await Transportation.delete(id);
    return transportation;
  }
}

export default Transportation;
