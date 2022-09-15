import { Tests } from "@prisma/client";
import connection from "../database/connection";
import { ITest } from "../interfaces/tests.interfaces";

async function insert(data: Omit<Tests, 'id'>) {
  return await connection.tests.create({ data: data });
}

async function findAllTests() {
  return await connection.tests.findMany();
}

async function findAllTestsByTeacherId(id: number) {
  return await connection.tests.findMany({
    where: { teacherDisciplineId: id },
  });
}

const testsRepository = {
  insert,
  findAllTests,
  findAllTestsByTeacherId
};

export default testsRepository;
