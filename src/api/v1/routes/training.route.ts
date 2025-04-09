import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import HealthController from "@api/v1/controllers/health/HealthController";
import EquipamentController from "@api/v1/controllers/equipaments/EquipController";
import userAutenticated from "@middlewares/userAuthenticated";

const equipamentController = new EquipamentController();
const trainingRouter = Router();

trainingRouter.post(
	"/create",
	celebrate({
		[Segments.BODY]: Joi.object({
			equipament_id: Joi.string().required(),
			moviment: Joi.string().required(),
			weight: Joi.number().required(),
			repetitions: Joi.number().required(),
			series: Joi.number().default(3),
		}),
	}),
	userAutenticated,
	equipamentController.create,
);

trainingRouter.get("/list", userAutenticated, equipamentController.list);

export default trainingRouter;
