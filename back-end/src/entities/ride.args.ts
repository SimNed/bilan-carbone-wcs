import { Field, Float, ArgsType } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateRide {
  @Field()
  @MinLength(2)
  label!: string;

  @Field(() => Float)
  @Min(0)
  distance!: number;
  
  @Field(() => Float)
  @Min(0)
  date!: Date;
}
