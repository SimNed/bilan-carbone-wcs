import { ArgsType, Field } from "type-graphql";
import { MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateTag {
  @Field()
  @MinLength(2)
  name!: string;
}
