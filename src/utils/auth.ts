import jwt from "jsonwebtoken";

const SECRET_KEY = "password"; // Troque para uma chave mais segura

export const generateToken = (user: { id: string; role: string }) =>
  jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
};
