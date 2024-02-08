import { ArgsType, Field } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";

@ArgsType()
export class CreateOrUpdateUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(1)
  firstName!: string;

  @Field()
  @MinLength(1)
  lastName!: string;

  @Field()
  @MinLength(12)
  password!: string;
}

@ArgsType()
export class SignInUser {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  password!: string;
}
