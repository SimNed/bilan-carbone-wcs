import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";

import Transportation from "../entities/transportation";
import { CreateOrUpdateTransportation } from "../entities/transportation.args";

@Resolver()
export class TransportationResolver {
  @Query(() => [Transportation])
  transportations() {
    return Transportation.getTransportations();
  }

  @Query(() => Transportation)
  transportation(@Arg("id", () => ID) id: number) {
    return Transportation.getTransportationById(id);
  }

  @Mutation(() => Transportation)
  createTransportation(@Args() args: CreateOrUpdateTransportation) {
    return Transportation.createTransportationIfNotExisting({ ...args });
  }

  @Mutation(() => Transportation)
  updateTransportation(
    @Arg("id", () => ID) id: number,
    @Args() args: CreateOrUpdateTransportation
  ) {
    return Transportation.updateTransportation(id, args);
  }

  @Mutation(() => Transportation)
  async deleteTransportation(@Arg("id", () => ID) id: number) {
    return Transportation.deleteTransportation(id);
  }
}
