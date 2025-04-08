import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import HealthController from "../controllers/users/health.controllers";
import EquipamentoController from "../controllers/trainings/equip-controller";
import userAutenticated from "../middlewares/userAuthenticated";

const healthRouter = Router();
const healthController = new HealthController();
const equipamentoController = new EquipamentoController();

healthRouter.get("/user/health", healthController.getImcHealth);

healthRouter.post(
	"/user/equipamento",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().min(2).max(100).required(),
			equipament_kind: Joi.string()
				.valid("Máquina", "Livre", "Barra", "Haltere")
				.required(),
		}),
	}),
	healthController.createEquipment,
);

healthRouter.post(
	"/user/training/create",
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
	equipamentoController.createTraining,
);

healthRouter.get(
	"/user/heatlh/equipaments",
	userAutenticated,
	healthController.getUserEquipaments,
);

healthRouter.get(
	"/user/heatlh/training",
	userAutenticated,
	equipamentoController.getTrainings,
);

export default healthRouter;
