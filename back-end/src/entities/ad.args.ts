import { Field, Float, Int, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateAd {
  @Field()
  @MinLength(2)
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field(() => Float)
  @Min(0)
  price!: number;

  @Field({ nullable: true })
  picture!: string;

  @Field({ nullable: true })
  location!: string;

  @Field(() => Int)
  categoryId!: number;

  @Field(() => [String], { nullable: true })
  tagIds!: string[];
}
