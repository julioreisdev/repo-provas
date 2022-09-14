import { Users } from "@prisma/client";

export interface IAuth {
  email: string;
  password: string;
  passwordConfirm: string;
}

