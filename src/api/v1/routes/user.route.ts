import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "@controllers/users/users.controllers";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
	"/user",
	celebrate({
		[Segments.BODY]: Joi.object({
			full_name: Joi.string().required().messages({
				"string.empty": "O nome completo é obrigatório",
				"any.required": "O nome completo é obrigatório",
			}),
			nick_name: Joi.string().required().messages({
				"string.empty": "O apelido é obrigatório",
				"any.required": "O apelido é obrigatório",
			}),
			email: Joi.string().email().required().messages({
				"string.email": "Por favor, insira um e-mail válido",
				"string.empty": "O e-mail é obrigatório",
				"any.required": "O e-mail é obrigatório",
			}),
			height: Joi.number().integer().positive().required().messages({
				"number.base": "A altura deve ser um número",
				"number.integer": "A altura deve ser um número inteiro",
				"number.positive": "A altura deve ser um valor positivo",
				"any.required": "A altura é obrigatória",
			}),
			weight: Joi.number().integer().positive().required().messages({
				"number.base": "O peso deve ser um número",
				"number.integer": "O peso deve ser um número inteiro",
				"number.positive": "O peso deve ser um valor positivo",
				"any.required": "O peso é obrigatório",
			}),
			age: Joi.number().integer().min(13).max(120).required().messages({
				"number.base": "A idade deve ser um número",
				"number.integer": "A idade deve ser um número inteiro",
				"number.min": "A idade mínima é 13 anos",
				"number.max": "A idade máxima é 120 anos",
				"any.required": "A idade é obrigatória",
			}),
			password: Joi.string().min(8).required().messages({
				"string.empty": "A senha é obrigatória",
				"string.min": "A senha deve ter pelo menos 8 caracteres",
				"any.required": "A senha é obrigatória",
			}),
		}),
	}),
	userController.create,
);

userRoutes.get(
	"/user/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
	}),
	userController.show,
);

userRoutes.get("/users", userController.list);

userRoutes.patch(
	"/user/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required().messages({
				"string.empty": "O ID do usuário é obrigatório",
				"any.required": "O ID do usuário é obrigatório",
			}),
		}),
		[Segments.BODY]: Joi.object({
			full_name: Joi.string().optional().messages({
				"string.empty": "O nome completo não pode ser vazio",
			}),
			nick_name: Joi.string().optional().messages({
				"string.empty": "O apelido não pode ser vazio",
			}),
			email: Joi.string().email().optional().messages({
				"string.email": "Por favor, insira um e-mail válido",
				"string.empty": "O e-mail não pode ser vazio",
			}),
			height: Joi.number().integer().positive().optional().messages({
				"number.base": "A altura deve ser um número",
				"number.integer": "A altura deve ser um número inteiro",
				"number.positive": "A altura deve ser um valor positivo",
			}),
			weight: Joi.number().integer().positive().optional().messages({
				"number.base": "O peso deve ser um número",
				"number.integer": "O peso deve ser um número inteiro",
				"number.positive": "O peso deve ser um valor positivo",
			}),
			age: Joi.number().integer().min(13).max(120).optional().messages({
				"number.base": "A idade deve ser um número",
				"number.integer": "A idade deve ser um número inteiro",
				"number.min": "A idade mínima é 13 anos",
				"number.max": "A idade máxima é 120 anos",
			}),
			password: Joi.string().min(8).optional().messages({
				"string.empty": "A senha não pode ser vazia",
				"string.min": "A senha deve ter pelo menos 8 caracteres",
			}),
		})
			.min(1)
			.messages({
				"object.min": "Pelo menos um campo deve ser fornecido para atualização",
			}),
	}),
	userController.update,
);

userRoutes.delete(
	"/user/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
	}),
	userController.delete,
);

export default userRoutes;
