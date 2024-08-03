import User from "../entities/user";

export async function createUser(): Promise<User> {
  const email = "michelle@mail.com";
  const existingUser = await User.findOneBy({ email });

  return (
    existingUser ||
    User.saveNewUser({
      email,
      firstName: "Michelle",
      lastName: "Testeuse",
      password: "my-secret-pw",
    })
  );
}
