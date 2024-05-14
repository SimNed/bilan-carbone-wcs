import { Arg, Args, ID, Mutation, Query, Resolver } from 'type-graphql';

import Ride from '../entities/ride';
import { CreateOrUpdateRide } from '../entities/ride.args';

@Resolver()
export class RideResolver {
  @Query(() => [Ride])
  rides() {
    return Ride.getRides();
  }

  @Query(() => Ride)
  ride(@Arg('id', () => ID) id: string) {
    return Ride.getRideById(id);
  }

  // add user context
  @Mutation(() => Ride)
  createRide(@Args() args: CreateOrUpdateRide) {
    return Ride.createRide({ ...args });
  }

  // add user context
  @Mutation(() => Ride)
  updateRide(
    @Arg('id', () => ID) id: string,
    @Args() args: CreateOrUpdateRide
  ) {
    return Ride.updateRide(id, args);
  }

  // add user context
  @Mutation(() => Ride)
  async deleteRide(@Arg('id', () => ID) id: string) {
    return Ride.deleteRide(id);
  }
}
