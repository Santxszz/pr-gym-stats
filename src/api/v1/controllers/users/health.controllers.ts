import GetUserIMCService from "@api/v1/services/health/get-user-imc";
import CreateUserService from "@api/v1/services/users/create-user-service";
import DeleteUserService from "@api/v1/services/users/delete-user-service";
import ListUsersService from "@api/v1/services/users/list-users-service";
import ShowUserService from "@api/v1/services/users/show-user-service";
import UpdateUserService from "@api/v1/services/users/update-user-service";
import { getExtIdFromToken } from "@api/v1/utils/getUserInfoToken";
import type { Request, Response } from "express";

export default class HealthController {
	public async getImcHealth(req: Request, res: Response): Promise<Response> {
		const userId = getExtIdFromToken(req.headers.authorization as string);

		console.log("userId");

		const userHealthService = new GetUserIMCService();
		const user = await userHealthService.execute({
			userId,
		});

		return res.status(200).json(user);
	}
}
