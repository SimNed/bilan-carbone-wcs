import {
  Arg,
  Args,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Context } from "..";
import User from "../entities/user";
import Transportation from "../entities/transportation";

@Resolver()
export class TransportationResolver {
  @Query(() => [Transportation])
  transportations() {
    return Transportation.getTransportations()
  }

  // @Query(() => Ad)
  // transportation(@Arg("id", () => ID) id: string) {
  //   return Ad.getAdById(id);
  // }

  // @Authorized()
  // @Mutation(() => Ad)
  // createAd(@Args() args: CreateOrUpdateAd, @Ctx() { user }: Context) {
  //   return Ad.saveNewAd({ ...args, owner: user as User });
  // }

  // @Authorized()
  // @Mutation(() => Ad)
  // updateAd(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateAd) {
  //   return Ad.updateAd(id, args);
  // }

  // @Authorized()
  // @Mutation(() => Ad)
  // async deleteAd(@Arg("id", () => ID) id: string) {
  //   return Ad.deleteAd(id);
  // }
}
