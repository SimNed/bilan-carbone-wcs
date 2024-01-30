import { Args, Mutation, Query, Resolver } from "type-graphql";
import Tag from "../entities/tag";
import { CreateOrUpdateTag } from "../entities/tag.args";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  tags() {
    return Tag.getTags();
  }

  @Mutation(() => Tag)
  createTag(@Args() args: CreateOrUpdateTag) {
    return Tag.saveNewTag(args);
  }
}
