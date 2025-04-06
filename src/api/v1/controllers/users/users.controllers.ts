import AuthUserService from "@api/v1/services/auth/auth-user-service";
import CreateUserService from "@api/v1/services/users/create-user-service";
import DeleteUserService from "@api/v1/services/users/delete-user-service";
import ListUsersService from "@api/v1/services/users/list-users-service";
import ShowUserService from "@api/v1/services/users/show-user-service";
import UpdateUserService from "@api/v1/services/users/update-user-service";
import type { Request, Response } from "express";
import z from "zod";

export default class UserController {
	public async create(req: Request, res: Response): Promise<Response> {
		const {
			full_name,
			nick_name,
			email,
			height,
			weight,
			age,
			password,
			zip_code,
		} = req.body;

		const userService = new CreateUserService();

		const user = await userService.execute({
			full_name,
			nick_name,
			email,
			height,
			zip_code,
			weight,
			age,
			password,
		});

		return res.status(201).json({
			id: user.id,
			full_name: user.full_name,
			nick_name: user.nick_name,
			email: user.email,
			height: user.height,
			zip_code: user.zip_code,
			street: user.street,
			street_number: user.street_number,
			neighborhood: user.neighborhood,
			city: user.city,
			state: user.state,
			weight: user.weight,
			age: user.age,
			created_at: user.created_at,
			updated_at: user.updated_at,
		});
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params;
		const userService = new ShowUserService();

		const user = await userService.execute({
			userId,
		});

		const userResponse = {
			id: user.id,
			ext_id: user.ext_id,
			full_name: user.full_name,
			nick_name: user.nick_name,
			email: user.email,
			height: user.height,
			weight: user.weight,
			age: user.age,
			created_at: user.created_at,
			updated_at: user.updated_at,
		};

		return res.status(200).json(userResponse);
	}

	public async list(req: Request, res: Response): Promise<Response> {
		const userService = new ListUsersService();
		const users = await userService.execute();

		const usersResponse = users.map((user) => ({
			id: user.id,
			ext_id: user.ext_id,
			full_name: user.full_name,
			nick_name: user.nick_name,
			email: user.email,
			height: user.height,
			weight: user.weight,
			age: user.age,
			created_at: user.created_at,
			updated_at: user.updated_at,
		}));

		return res.status(200).json(usersResponse);
	}

	public async update(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params;
		const updateData = req.body;

		const updateService = new UpdateUserService();

		const updatedUser = await updateService.execute({
			userId,
			...updateData,
		});

		return res.status(200).json({
			id: updatedUser.id,
			ext_id: updatedUser,
			full_name: updatedUser.full_name,
			nick_name: updatedUser.nick_name,
			email: updatedUser.email,
			height: updatedUser.height,
			weight: updatedUser.weight,
			age: updatedUser.age,
			created_at: updatedUser.created_at,
			updated_at: updatedUser.updated_at,
		});
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params;
		const userService = new DeleteUserService();

		await userService.execute({ userId });

		return res.status(204).send();
	}

	public async auth(req: Request, res: Response): Promise<Response> {
		const { email, password } = req.body;

		const userService = new AuthUserService();
		const userAuth = await userService.execute({
			email,
			password,
		});

		return res.status(200).json(userAuth);
	}
}
