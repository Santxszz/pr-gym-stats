import GetUserIMCService from "@api/v1/services/health/get-user-imc";
import CreateEquipService from "@api/v1/services/trainings/create-equip-service";
import GetUserEquipService from "@api/v1/services/trainings/get-user-equip-service";
import { getExtIdFromToken } from "@api/v1/utils/getUserInfoToken";
import type { Request, Response } from "express";

export default class HealthController {
	public async getImcHealth(req: Request, res: Response): Promise<Response> {
		const userId = getExtIdFromToken(req.headers.authorization as string);

		const userHealthService = new GetUserIMCService();
		const user = await userHealthService.execute({
			userId,
		});

		return res.status(200).json(user);
	}

	public async createEquipment(req: Request, res: Response): Promise<Response> {
		const { nome, tipo } = req.body;
		const userId = getExtIdFromToken(req.headers.authorization as string);

		const createEquipService = new CreateEquipService();
		const user = await createEquipService.execute({
			nome,
			tipo,
			usuario_id: userId,
		});

		return res.status(201).json(user);
	}

	public async getUserEquipaments(
		req: Request,
		res: Response,
	): Promise<Response> {
		const userId = getExtIdFromToken(req.headers.authorization as string);

		const listEquipService = new GetUserEquipService();
		const user = await listEquipService.execute({
			usuario_id: userId,
		});

		return res.status(200).json(user);
	}
}
