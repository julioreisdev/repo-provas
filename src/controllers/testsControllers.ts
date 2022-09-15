import { Request, Response } from "express";
import { ITest } from "../interfaces/tests.interfaces";
import { addTestSerive } from "../services/testsServices";

export async function addTest(req: Request, res: Response) {
    const data: ITest = res.locals.body
    try {
        const result = await addTestSerive(data)
        return res.send(result)
    } catch (error: any) {
        if (error.type === 'not_found') return res.status(404).send(error.message) 
        return res.status(500).send(error)
    }
}