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
import Ad from "../entities/ad";
import { CreateOrUpdateAd } from "../entities/ad.args";
import { Context } from "..";
import User from "../entities/user";

@Resolver()
export class AdResolver {
  @Query(() => [Ad])
  ads(@Arg("category", { nullable: true }) category: number) {
    return Ad.getAds(category ?? undefined);
  }

  @Query(() => Ad)
  ad(@Arg("id", () => ID) id: string) {
    return Ad.getAdById(id);
  }

  @Authorized()
  @Mutation(() => Ad)
  createAd(@Args() args: CreateOrUpdateAd, @Ctx() { user }: Context) {
    return Ad.saveNewAd({ ...args, owner: user as User });
  }

  @Authorized()
  @Mutation(() => Ad)
  updateAd(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateAd) {
    return Ad.updateAd(id, args);
  }

  @Authorized()
  @Mutation(() => Ad)
  async deleteAd(@Arg("id", () => ID) id: string) {
    return Ad.deleteAd(id);
  }
}
