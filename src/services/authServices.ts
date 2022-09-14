import { Users } from "@prisma/client";
import { IAuth } from "../interfaces/auth.interfaces";
import authRepository from "../repositories/authRepositoy";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export async function signupSerive(data: IAuth) {
  const user: Users | null = await authRepository.findByEmail(data.email);
  if (data.password !== data.passwordConfirm) {
    throw { type: "unauthorized", message: "Passwords don't equals" };
  }
  if (user) {
    throw { type: "conflict", message: "E-mail already exist!" };
  }
  await authRepository.insert({
    email: data.email,
    password: bcrypt.hashSync(data.password, 10),
  });
  return "User created successify!";
}

export async function signinService(data: Omit<IAuth, "passwordConfirm">) {
  const user: Users | null = await authRepository.findByEmail(data.email);
  if (!user) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }
  if (!bcrypt.compareSync(data.password, user.password)) {
    throw { type: "unauthorized", message: "Unauthorized" };
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    `${process.env.SECRET}`,
    { expiresIn: 1800 }
  );

  return { token };
}
