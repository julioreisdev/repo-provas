import {
  Categories,
  Disciplines,
  Teachers,
  TeachersDisciplines,
  Tests,
} from "@prisma/client";
import { ITest } from "../interfaces/tests.interfaces";
import categoriesRepository from "../repositories/categoriesRepository";
import disciplinesRepository from "../repositories/disciplinesRepository";
import teachersDisciplinesRepositoty from "../repositories/teachersDisciplinesRepository";
import teachersRepositoty from "../repositories/teachersRepository";
import testsRepository from "../repositories/testsRepository";

export async function addTestServive(data: ITest) {
  const discipline: Disciplines | null = await disciplinesRepository.findByName(
    data.discipline
  );
  const catedory: Categories | null = await categoriesRepository.findByName(
    data.category
  );
  const teacher: Teachers | null = await teachersRepositoty.findByName(
    data.teacher
  );

  if (!discipline) {
    throw { type: "not_found", message: "Discipline not exist" };
  }
  if (!catedory) {
    throw { type: "not_found", message: "Category not exist" };
  }
  if (!teacher) {
    throw { type: "not_found", message: "Teacher not exist" };
  }

  const teacherDiscipline: TeachersDisciplines[] | null =
    await teachersDisciplinesRepositoty.findTacherDiscipline(
      teacher.id,
      discipline.id
    );

  if (teacherDiscipline.length === 0) {
    throw {
      type: "not_found",
      message: `${teacher.name} not a teacher of ${discipline.name}`,
    };
  }

  const test: Tests = await testsRepository.insert({
    name: data.name,
    pdfUrl: data.pdfUrl,
    categoryId: catedory.id,
    teacherDisciplineId: teacher.id,
  });

  return {test};
}

export async function findTestesByDisciplineService() {
  return "testes por disciplina";
}

export async function findTestesByTeacherService() {
  return "testes por professor";
}
