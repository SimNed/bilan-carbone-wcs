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
import UserSession from "./userSession";
import { sendEmail } from "../utils/email";

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

  @Field()
  get initials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }

  @Column()
  hashedPassword!: string;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions!: UserSession[];

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

  static async saveNewUser(userData: CreateOrUpdateUser): Promise<User> {
    userData.password = await hash(userData.password, 10);

    const newUser = new User(userData);
    // TODO: return user-friendly error message when email already used
    const savedUser = await newUser.save();
    sendEmail(newUser.email);
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
  }: SignInUser): Promise<{ user: User; session: UserSession }> {
    const user = await this.getUserWithEmailAndPassword({ email, password });
    const session = await UserSession.saveNewSession(user);
    return { user, session };
  }

  static async getUserWithSessionId(sessionId: string): Promise<User | null> {
    const session = await UserSession.findOne({
      where: { id: sessionId },
      relations: { user: true },
    });
    if (!session) {
      return null;
    }
    return session.user;
  }

  async isRideOwner(rideId: string): Promise<boolean> {
    try {
      const ride = await Ride.getRideById(rideId);
      return this.id === ride.owner.id;
    } catch (error) {
      return false;
    }
  }
}

export default User;
