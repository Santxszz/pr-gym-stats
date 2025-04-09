import type { Request, Response } from "express";
import CreateTrainingService from "@api/v1/services/trainings/create-train-service";
import { getExtIdFromToken } from "@api/v1/utils/getUserInfoToken";
import GetTrainingService from "@api/v1/services/trainings/get-training-service";

export default class TrainingController {
	public async createTraining(req: Request, res: Response): Promise<Response> {
		const { equipament_id, moviment, weight, repetitions, series } = req.body;
		const user_id = getExtIdFromToken(req.headers.authorization as string);

		const createTrainingService = new CreateTrainingService();

		const training = await createTrainingService.execute({
			equipament_id,
			moviment,
			weight,
			repetitions,
			series,
			user_id,
		});

		return res.status(201).json(training);
	}

	public async getTrainings(req: Request, res: Response): Promise<Response> {
		const user_id = getExtIdFromToken(req.headers.authorization as string);
		const getTrainingService = new GetTrainingService();
		const trainings = await getTrainingService.execute({
			user_id,
		});

		return res.status(200).json(trainings);
	}
}
