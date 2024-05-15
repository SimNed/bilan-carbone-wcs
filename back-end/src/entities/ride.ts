import {
  BaseEntity,
  Between,
  Column,
  Entity,
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  ManyToOne,
  MoreThanOrEqual,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";

import { CreateOrUpdateRide, FilterRide } from "./ride.args";
import Transportation from "./transportation";
import User from "./user";

type RideArgs = CreateOrUpdateRide & {};

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

  @ManyToOne(() => User, (user) => user.rides, { eager: true })
  @Field(() => User)
  owner!: User;

  @ManyToOne(() => Transportation, (transportation) => transportation.rides, {
    eager: true,
  })
  @Field(() => Transportation)
  transportation!: Transportation;

  constructor(ride?: RideArgs) {
    super();

    if (ride) {
      this.label = ride.label;
      this.distance = ride.distance;
      this.date = ride.date;
    }
  }

  static async getRides(filterData: FilterRide): Promise<Ride[]> {
    const whereConditions: FindOptionsWhere<Ride>[] = [];
    if (filterData.label) {
      console.log("LABEL OK", filterData.label);
      whereConditions.push({ label: Like(`${filterData.label}`) });
    }

    if (filterData.transportationId)
      whereConditions.push({
        transportation: { id: filterData.transportationId },
      });

    if (filterData.minDistance && filterData.maxDistance)
      whereConditions.push({
        distance: Between(filterData.minDistance, filterData.maxDistance),
      });
    else {
      if (filterData.minDistance)
        whereConditions.push({
          distance: MoreThanOrEqual(filterData.minDistance),
        });
      if (filterData.maxDistance)
        whereConditions.push({
          distance: LessThanOrEqual(filterData.maxDistance),
        });
    }

    if (filterData.startDate && filterData.endDate)
      whereConditions.push({
        date: Between(filterData.startDate, filterData.endDate),
      });
    else {
      if (filterData.startDate)
        whereConditions.push({ date: MoreThanOrEqual(filterData.startDate) });
      if (filterData.endDate)
        whereConditions.push({ date: LessThanOrEqual(filterData.endDate) });
    }

    console.log("WHERE CONDITION", whereConditions);

    const rides = await Ride.find({
      where: whereConditions,
    });

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
    if (rideData.transportationId) {
      const transportation = await Transportation.getTransportationById(
        rideData.transportationId
      );
      newRide.transportation = transportation;
    }
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
