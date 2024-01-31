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
    const transportations = await Transportation.find()
    return transportations
  }
}

export default Transportation;
