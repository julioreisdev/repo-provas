import { Categories, Teachers } from "@prisma/client";
import { ITest } from "../interfaces/tests.interfaces";
import categoriesRepository from "../repositories/categoriesRepository";
import teachersRepositoty from "../repositories/teachersRepository";
import testsRepository from "../repositories/testsRepository";

export async function addTestSerive(data: ITest) {
  const category: Categories | null = await categoriesRepository.findByid(
    data.categoryId
  );
  if (!category) {
    throw { type: "not_found", message: "Category not found" };
  }
  const teacher: Teachers | null = await teachersRepositoty.findById(
    data.teacherDisciplineId
  );
  if (!teacher) {
    throw { type: "not_found", message: "Teacher not found" };
  }
  const test: ITest = await testsRepository.insert(data);
  return { test: test.name, message: "Test created successify" };
}
