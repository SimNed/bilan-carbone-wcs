import { Field, Float, ArgsType, Int } from "type-graphql";
import { Min, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateRide {
  @Field()
  @MinLength(2)
  label!: string;
  @Field(() => Float)
  @Min(0)
  distance!: number;

  @Field()
  date!: Date;

  @Field(() => Int)
  transportationId!: number;
}

@ArgsType()
export class FilterRide {
  @Field({ nullable: true })
  label?: string;

  @Field(() => Int, { nullable: true })
  transportationId?: number;

  @Field(() => Float, { nullable: true })
  @Min(0)
  minDistance?: number;

  @Field(() => Float, { nullable: true })
  @Min(0)
  maxDistance?: number;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;
}
