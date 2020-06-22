import { Router } from "express";

import { getCircumference } from "../controllers/planet";

const router = Router();

router.get("/circumference", getCircumference);

export default router;
