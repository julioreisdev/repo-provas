import { Request, Response } from "express";
import { ITest } from "../interfaces/tests.interfaces";
import { addTestServive, findTestesByDisciplineService, findTestesByTeacherService } from "../services/testsServices";

export async function addTest(req: Request, res: Response) {
  const data: ITest = res.locals.body;
  try {
    const result = await addTestServive(data);
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "not_found") return res.status(404).send(error.message);
    return res.status(500).send(error);
  }
}

export async function findTestesDiscipline(req: Request, res: Response) {
  try {
    const result = await findTestesByDisciplineService()
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function findTestesTeacher(req: Request, res: Response) {
    try {
      const result = await findTestesByTeacherService()
      return res.send(result);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
