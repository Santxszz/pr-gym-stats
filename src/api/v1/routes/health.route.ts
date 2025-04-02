import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import HealthController from "../controllers/users/health.controllers";
import EquipamentoController from "../controllers/trainings/equip-controller";

const healthRouter = Router();
const healthController = new HealthController();
const equipController = new EquipamentoController

healthRouter.get(
	"/user/health/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
	}),
	healthController.getImcHealth,
);

healthRouter.post(
	"/user/equipamento",
	celebrate({
		[Segments.BODY]: Joi.object({
			nome: Joi.string().min(2).max(100).required().messages({
				"string.empty": "O nome do equipamento é obrigatório",
				"string.min": "O nome deve ter pelo menos 2 caracteres",
				"any.required": "O nome do equipamento é obrigatório",
			}),
			tipo: Joi.string()
				.valid("Máquina", "Livre", "Acessório", "Barra", "Haltere")
				.required()
				.messages({
					"any.only":
						"O tipo deve ser Máquina, Livre, Acessório, Barra ou Haltere",
					"any.required": "O tipo de equipamento é obrigatório",
				}),
		}),
	}),
	equipController.create,
);

export default healthRouter;
