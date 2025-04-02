import CreateUserService from "@api/v1/services/users/create-user-service";
import ListUsersService from "@api/v1/services/users/list-users-service";
import ShowUserService from "@api/v1/services/users/show-user-service";
import type { Request, Response } from "express";

export default class UserController {
	public async create(req: Request, res: Response): Promise<Response> {
		const { name, email } = req.body;

		const userService = new CreateUserService();

		const user = await userService.execute({
			name,
			email,
		});

		return res.status(201).json(user);
	}

	public async show(req: Request, res: Response): Promise<Response> {
		const { userId } = req.params;
		const userIdNumber = Number(userId);

		const userService = new ShowUserService();

		const user = await userService.execute({
			userId: userIdNumber,
		});

		return res.status(200).json(user);
	}

	public async list(req: Request, res: Response): Promise<Response> {
		const userService = new ListUsersService();
		const users = await userService.execute();
		return res.status(200).json(users);
	}
}
