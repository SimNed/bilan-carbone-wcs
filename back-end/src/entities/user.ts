import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { compare, hash } from "bcrypt";
import { CreateOrUpdateUser, SignInUser } from "./user.args";
import Ride from "./ride";

@Entity("AppUser")
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id!: string;

  @Column({ unique: true })
  @Field()
  email!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column()
  hashedPassword!: string;

  @OneToMany(() => Ride, (ride) => ride.owner)
  rides!: Ride[];

  constructor(user?: CreateOrUpdateUser) {
    super();

    if (user) {
      this.email = user.email;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.hashedPassword = user.password;
    }
  }

  static async createUser(userData: CreateOrUpdateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);

    const newUser = new User(userData);
    // TODO: return user-friendly error message when email already used
    const savedUser = await newUser.save();
    return savedUser;
  }

  static async getUserWithEmailAndPassword({
    email,
    password,
  }: SignInUser): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await compare(password, user.hashedPassword))) {
      throw new Error("INVALID_CREDENTIALS");
    }
    return user;
  }

  static async signIn({
    email,
    password,
  }: SignInUser): Promise<{ user: User }> {
    const user = await this.getUserWithEmailAndPassword({ email, password });
    return { user };
  }
}

export default User;