import { Router, RequestHandler } from "express";

import { getPi } from "../controllers/math";

const router = Router();

router.get("/pi", getPi);

export default router;
