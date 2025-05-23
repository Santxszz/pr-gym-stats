import type { Request, Response } from "express";
import CreateEquipService from "@api/v1/services/equipament/create-equip-service";
import CreateTrainingService from "@api/v1/services/trainings/create-train-service";
import { getExtIdFromToken } from "@api/v1/utils/getUserInfoToken";
import GetTrainingService from "@api/v1/services/trainings/get-training-service";
import GetEquipamentService from "@api/v1/services/equipament/get-equip-service";

export default class EquipamentController {
	public async create(req: Request, res: Response): Promise<Response> {
		const user_id = getExtIdFromToken(req.headers.authorization as string);
		const { name, equipament_kind } = req.body;

		const createEquipService = new CreateEquipService();

		const equipament = await createEquipService.execute({
			name,
			equipament_kind,
			user_id,
		});

		return res.status(201).json({
			success: true,
			data: {
				id: equipament.ext_id,
				name: equipament.name,
				equipament_kind: equipament.equipament_kind,
				created_at: equipament.created_at,
			},
		});
	}

	public async list(req: Request, res: Response): Promise<Response> {
		const user_id = getExtIdFromToken(req.headers.authorization as string);
		const getEquipamentService = new GetEquipamentService();
		const equipaments = await getEquipamentService.execute({
			user_id,
		});

		return res.status(200).json(equipaments);
	}
}
