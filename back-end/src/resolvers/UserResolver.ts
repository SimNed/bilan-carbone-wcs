import { Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/user";
import { CreateOrUpdateUser, SignInUser } from "../entities/user.args";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.createUser(args);
  }

  @Mutation(() => User)
  async signIn(
    @Args() args: SignInUser,
  ): Promise<User> {
    const { user } = await User.signIn(args);
    return user;
  }
}
