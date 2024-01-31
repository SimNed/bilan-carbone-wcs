import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import { ObjectType, Field, ID, Float } from "type-graphql";
  
  import { CreateOrUpdateRide } from "./ride.args";
import User from "./user";
import Transportation from "./transportation";
  
  type RideArgs = CreateOrUpdateRide & {

  };
  
  @Entity()
  @ObjectType()
  class Ride extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => ID)
    id!: string;
  
    @Column()
    @Field()
    label!: string;

    @Column()
    @Field(() => Float)
    distance!: number;

    @Column()
    @Field(() => Date)
    date!: Date;

    @ManyToOne(() => User, (user) => user.rides)
    user! : User;

    @ManyToOne(() => User, (user) => user.rides)
    transportation! : Transportation;
  
    constructor(ride?: RideArgs) {
      super();
  
      if (ride) {
        this.label = ride.label;
        this.distance = ride.distance;
        this.date = ride.date;
      }
    }
  }
  
  export default Ride;
  