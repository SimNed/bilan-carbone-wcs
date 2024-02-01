import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ObjectType, Field, ID, Float } from 'type-graphql';

import { CreateOrUpdateRide } from './ride.args';
import Transportation from './transportation';

type RideArgs = CreateOrUpdateRide & {};

@Entity()
@ObjectType()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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

  // @ManyToOne(() => Transportation, (transportation) => transportation.rides, {
  //   eager: true,
  // })
  // @Field(() => Transportation)
  // transportation!: Transportation;

  constructor(ride?: RideArgs) {
    super();

    if (ride) {
      this.label = ride.label;
      this.distance = ride.distance;
      this.date = ride.date;
    }
  }

  static async getRides(): Promise<Ride[]> {
    const rides = await Ride.find();
    return rides;
  }

  static async getRideById(id: string): Promise<Ride> {
    const ride = await Ride.findOne({
      where: { id },
    });
    if (!ride) {
      throw new Error(`Ride with ID ${id} does not exist.`);
    }
    return ride;
  }

  static async createRide(rideData: RideArgs): Promise<Ride> {
    const newRide = new Ride(rideData);
    const savedRide = await newRide.save();
    return savedRide;
  }

  static async updateRide(
    id: string,
    partialRide: CreateOrUpdateRide
  ): Promise<Ride> {
    const ride = await Ride.getRideById(id);
    Object.assign(ride, partialRide);
    await ride.save();
    ride.reload();
    return ride;
  }

  static async deleteRide(id: string): Promise<Ride> {
    const ride = await Ride.getRideById(id);
    await Ride.delete(id);
    return ride;
  }
}

export default Ride;
