import { Router } from "express";
import HealthController from "@api/v1/controllers/health/HealthController";

const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get("/imc", healthController.getImcHealth);

export default healthRouter;
