import connection from "../database/connection";
import { IAuth } from "../interfaces/auth.interfaces";

async function insert(data: Omit<IAuth, "passwordConfirm">) {
  return await connection.users.create({ data: data });
}

async function findById(id: number) {
  return await connection.users.findUnique({ where: { id: id } });
}

async function findByEmail(email: string) {
  return await connection.users.findUnique({ where: { email: email } });
}

const authRepository = {
  insert,
  findById,
  findByEmail,
};

export default authRepository;
