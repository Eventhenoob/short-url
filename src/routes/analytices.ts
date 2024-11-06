import { Router } from "express";
import { getAnalyticsByShortId } from "../controllers/analytics";

const analyticesRouter = Router();

analyticesRouter.get("/:shortId", getAnalyticsByShortId);

export default analyticesRouter;
