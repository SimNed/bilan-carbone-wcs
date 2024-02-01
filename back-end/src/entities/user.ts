// import { Field, ID, ObjectType } from "type-graphql";
// import {
//   BaseEntity,
//   Column,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
// } from "typeorm";
// import { CreateOrUpdateUser, SignInUser } from "./user.args";
// import Ride from "./ride";

// @Entity("AppUser")
// @ObjectType()
// class User extends BaseEntity {
//   @PrimaryGeneratedColumn("uuid")
//   @Field(() => ID)
//   id!: string;

//   @Column({ unique: true })
//   @Field()
//   email!: string;

//   @Column()
//   @Field()
//   firstName!: string;

//   @Column()
//   @Field()
//   lastName!: string;

//   @OneToMany(() => Ride, (ride) => ride.user)
//   rides!: Ride[];

//   constructor(user?: CreateOrUpdateUser) {
//     super();

//     if (user) {
//       this.email = user.email;
//       this.firstName = user.firstName;
//       this.lastName = user.lastName;
//     }
//   }
// }

// export default User;
