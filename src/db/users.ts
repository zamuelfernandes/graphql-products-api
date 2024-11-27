import bcrypt from "bcrypt";

const users = [
  {
    id: "0",
    email: "admin@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "admin",
  },
  {
    id: "1",
    email: "user@example.com",
    password: bcrypt.hashSync("password", 10),
    role: "user",
  },
];

export const getUserByEmail = (email: string) =>
  users.find((user) => user.email === email);

export const createUser = async (
  email: string,
  password: string,
  role: string
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: String(users.length + 1),
    email,
    password: hashedPassword,
    role,
  };
  users.push(newUser);
  return newUser;
};
