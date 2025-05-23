import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import UserController from "@api/v1/controllers/users/UserController";
import userAutenticated from "@middlewares/userAuthenticated";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
	"/create",
	celebrate({
		[Segments.BODY]: Joi.object({
			full_name: Joi.string().required(),
			nick_name: Joi.string().required(),
			email: Joi.string().email().required(),
			zip_code: Joi.string().required(),
			height: Joi.number().integer().positive().required(),
			weight: Joi.number().integer().positive().required(),
			age: Joi.number().integer().min(13).max(120).required(),
			password: Joi.string().min(8).required(),
		}),
	}),
	userController.create,
);

userRoutes.get(
	"/show/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
	}),
	userAutenticated,
	userController.show,
);

userRoutes.get("/list", userController.list);

userRoutes.patch(
	"/update/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
		[Segments.BODY]: Joi.object({
			full_name: Joi.string().optional(),
			nick_name: Joi.string().optional(),
			email: Joi.string().email().optional(),
			height: Joi.number().integer().positive().optional(),
			weight: Joi.number().integer().positive().optional(),
			age: Joi.number().integer().min(13).max(120).optional(),
			password: Joi.string().min(8).optional(),
		}).min(1),
	}),
	userController.update,
);

userRoutes.delete(
	"/delete/:userId",
	celebrate({
		[Segments.PARAMS]: Joi.object({
			userId: Joi.string().required(),
		}),
	}),
	userController.delete,
);

userRoutes.post(
	"/auth",
	celebrate({
		[Segments.BODY]: Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().min(8).required(),
		}),
	}),
	userController.auth,
);

// userRoutes.get(
// 	"/userInfo",
// 	userAutenticated,
// 	celebrate({
// 		[Segments.HEADERS]: Joi.object({
// 			authorization: Joi.string().required(),
// 		}).unknown(),
// 	}),
// 	userAutenticated,
// 	userController.userInfo,
// );

userRoutes.get(
	"/info",
	userAutenticated,
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required(),
		}).unknown(),
	}),
	userAutenticated,
	userController.userInfo,
);

export default userRoutes;
