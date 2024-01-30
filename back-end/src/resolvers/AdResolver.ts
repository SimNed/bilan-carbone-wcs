import { Arg, Args, ID, Mutation, Query, Resolver } from "type-graphql";
import Ad from "../entities/ad";
import { CreateOrUpdateAd } from "../entities/ad.args";

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

  @Mutation(() => Ad)
  createAd(@Args() args: CreateOrUpdateAd) {
    return Ad.saveNewAd(args);
  }

  @Mutation(() => Ad)
  updateAd(@Arg("id", () => ID) id: string, @Args() args: CreateOrUpdateAd) {
    return Ad.updateAd(id, args);
  }

  @Mutation(() => Ad)
  async deleteAd(@Arg("id", () => ID) id: string) {
    return Ad.deleteAd(id);
  }
}
