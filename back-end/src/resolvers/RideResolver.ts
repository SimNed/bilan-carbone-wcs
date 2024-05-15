import { Arg, Args, Ctx, ID, Mutation, Query, Resolver } from "type-graphql";

import Ride from "../entities/ride";
import { CreateOrUpdateRide, FilterRide } from "../entities/ride.args";
import { Context } from "..";

@Resolver()
export class RideResolver {
  @Query(() => [Ride])
  rides(@Args(() => FilterRide) args: FilterRide, @Ctx() { user }: Context) {
    console.log("ARGS IN RESOLVER", args);
    return Ride.getRides({ ...args });
  }

  @Query(() => Ride)
  ride(@Arg("id", () => ID) id: string) {
    return Ride.getRideById(id);
  }

  @Mutation(() => Ride)
  createRide(@Args() args: CreateOrUpdateRide) {
    return Ride.createRide({ ...args });
  }

  @Mutation(() => Ride)
  updateRide(
    @Arg("id", () => ID) id: string,
    @Args() args: CreateOrUpdateRide
  ) {
    return Ride.updateRide(id, args);
  }

  @Mutation(() => Ride)
  async deleteRide(@Arg("id", () => ID) id: string) {
    return Ride.deleteRide(id);
  }
}
