import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "@controllers/users/users.controllers";

const userRoutes = Router();
const userController = new UserController();

// Rota POST para criar usuário
userRoutes.post(
	"/user",
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().required().min(3).max(50),
			email: Joi.string().required().email(),
		}),
	}),
	userController.create,
);

// Rota GET para listar usuário por ID
userRoutes.get(
	"/user/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.number().required().messages({
				"number.base": "O ID deve ser um número",
				"number.empty": "O ID é obrigatório",
			}),
		}),
	}),
	userController.show,
);

userRoutes.get("/users", userController.list);

export default userRoutes;
