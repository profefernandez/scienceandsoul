import { Router, type IRouter } from "express";
import healthRouter from "./health";
import orbRouter from "./orb";
import inquiriesRouter from "./inquiries";

const router: IRouter = Router();

router.use(healthRouter);
router.use(orbRouter);
router.use(inquiriesRouter);

export default router;
