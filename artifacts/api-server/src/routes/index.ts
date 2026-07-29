import { Router, type IRouter } from "express";
import healthRouter from "./health";
import wasteColProxy from "./wastecol-proxy";

const router: IRouter = Router();

router.use(wasteColProxy);
router.use(healthRouter);

export default router;
