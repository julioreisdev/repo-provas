import { Router } from "express";
import { addTest } from "../controllers/testsControllers";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import addTestSchema from "../schemas/addTestSchema";

const router = Router();

router.post("/tests", validateToken,validateSchema(addTestSchema), addTest);

export default router;
