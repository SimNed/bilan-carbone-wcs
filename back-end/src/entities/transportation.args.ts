import { Field, Float, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateTransportation {
  @Field()
  @MinLength(2)
  label!: string;

  @Field(() => Float)
  @Min(0)
  carbone!: number;
}
