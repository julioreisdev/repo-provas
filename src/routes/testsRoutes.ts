import { Router } from "express";
import { addTest, findTestesDiscipline, findTestesTeacher } from "../controllers/testsControllers";
import validateSchema from "../middlewares/validateSchema";
import validateToken from "../middlewares/validateToken";
import addTestSchema from "../schemas/addTestSchema";

const router = Router();

router.post("/tests", validateToken,validateSchema(addTestSchema), addTest);
router.get("/tests/disciplines", validateToken, findTestesDiscipline);
router.get("/tests/teachers", validateToken, findTestesTeacher);

export default router;
