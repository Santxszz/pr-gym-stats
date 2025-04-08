import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import HealthController from "../controllers/users/health.controllers";
import EquipamentoController from "../controllers/trainings/equip-controller";
import userAutenticated from "../middlewares/userAuthenticated";
import { equipamentos } from "@database/schema";

const healthRouter = Router();
const healthController = new HealthController();
const equipamentoController = new EquipamentoController();

healthRouter.get("/user/health", healthController.getImcHealth);

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
				.valid("Máquina", "Livre", "Barra", "Haltere")
				.required()
				.messages({
					"any.only":
						"O tipo deve ser Máquina, Livre, Acessório, Barra ou Haltere",
					"any.required": "O tipo de equipamento é obrigatório",
				}),
		}),
	}),
	healthController.createEquipment,
);

healthRouter.post(
	"/user/training/create",
	celebrate({
		[Segments.BODY]: Joi.object({
			equipamento_id: Joi.string().required(),
			movimento: Joi.string().required(),
			peso: Joi.number().required(),
			repeticoes: Joi.number().required(),
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
	equipamentoController.getTreinos,
);

export default healthRouter;
