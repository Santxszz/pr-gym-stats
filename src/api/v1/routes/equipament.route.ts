import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import HealthController from "@api/v1/controllers/health/HealthController";
import EquipamentController from "@api/v1/controllers/equipaments/EquipController";
import userAutenticated from "@middlewares/userAuthenticated";

const equipamentRouter = Router();
const equipamentController = new EquipamentController();

equipamentRouter.post(
	"/create",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().min(2).max(100).required(),
			equipament_kind: Joi.string()
				.valid("Máquina", "Livre", "Barra", "Haltere")
				.required(),
		}),
	}),
	equipamentController.create,
);

equipamentRouter.get(
	"/list",
	userAutenticated,
	healthController.getUserEquipaments,
);

export default equipamentRouter;
