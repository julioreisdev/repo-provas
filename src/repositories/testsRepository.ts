import { Tests } from "@prisma/client";
import connection from "../database/connection";
import { ITest } from "../interfaces/tests.interfaces";

async function insert(data: Omit<Tests, "id">) {
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

async function findTestsDisciplines() {
  return await connection.terms.findMany({
    select: {
      number: true,
      disciplines: {
        select: {
          name: true,
          disciplines: {
            include: {
              teacher: {
                select: {
                  name: true,
                },
              },
              tests: {
                include: {
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}

const testsRepository = {
  insert,
  findAllTests,
  findAllTestsByTeacherId,
  findTestsDisciplines,
};

export default testsRepository;
