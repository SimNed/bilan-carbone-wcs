import { Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../entities/user";
import { CreateOrUpdateUser, SignInUser } from "../entities/user.args";
import { Context } from "..";
import { setUserSessionIdInCookie } from "../utils/cookie";

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  signUp(@Args() args: CreateOrUpdateUser) {
    return User.saveNewUser(args);
  }

  @Mutation(() => User)
  async signIn(
    @Args() args: SignInUser,
    @Ctx() context: Context
  ): Promise<User> {
    const { user, session } = await User.signIn(args);
    setUserSessionIdInCookie(context.res, session);
    return user;
  }

  @Authorized()
  @Query(() => User)
  async myProfile(@Ctx() { user }: Context): Promise<User> {
    return user as User;
  }
}
