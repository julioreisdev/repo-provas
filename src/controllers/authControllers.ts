import { Request, Response } from "express";
import { IAuth } from "../interfaces/auth.interfaces";
import { signinService, signupSerive } from "../services/authServices";

export async function signin(req: Request, res: Response) {
  const data: Omit<IAuth, 'passwordConfirm'> = res.locals.body;
  try {
    const result = await signinService(data)
    return res.send(result);
  } catch (error: any) {
    if (error.type === "unauthorized") return res.status(401).send(error.message);
    return res.status(500).send(error);
  }
}

export async function signup(req: Request, res: Response) {
  const data: IAuth = res.locals.body;
  try {
    const result = await signupSerive(data);
    return res.status(201).send(result);
  } catch (error: any) {
    if (error.type === "conflict") return res.status(409).send(error.message);
    if (error.type === "unauthorized") return res.status(401).send(error.message);
    return res.status(500).send(error);
  }
}
