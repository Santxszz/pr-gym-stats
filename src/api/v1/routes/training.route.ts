import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import HealthController from "@api/v1/controllers/health/HealthController";
import TrainingController from "@api/v1/controllers/trainings/TrainingController";
import userAutenticated from "@middlewares/userAuthenticated";

const trainingController = new TrainingController();
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
			muscle: Joi.string().required(),
		}),
	}),
	userAutenticated,
	trainingController.createTraining,
);

trainingRouter.get("/list", userAutenticated, trainingController.getTrainings);

export default trainingRouter;
