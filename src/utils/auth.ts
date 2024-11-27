import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../db/users";

const SECRET_KEY = "process.env.MY_SECRET_KEY"; // Mantenha isso seguro e use variáveis de ambiente!

export const generateToken = (user: { id: string; role: string }) => {
  return jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export const authenticateUser = async (email: string, password: string) => {
  const user = getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid password");

  return user;
};
