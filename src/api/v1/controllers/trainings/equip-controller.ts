import type { Request, Response } from "express";
import { db } from "@database/db";
import { equipamentos } from "@database/schema";
import AppError from "@utils/ApiError";
import CreateEquipService from "@api/v1/services/trainings/create-equip-service";
import CreateTrainingService from "@api/v1/services/trainings/create-train-service";
import { getExtIdFromToken } from "@api/v1/utils/getUserInfoToken";
import GetTrainingService from "@api/v1/services/trainings/get-training-service";

export default class EquipamentoController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { nome, tipo, usuario_id } = req.body;

			// Validação básica no controller (opcional, pode ser feita no Celebrate)
			if (!nome || !tipo) {
				throw new AppError("Nome e tipo são obrigatórios", 400);
			}

			const createEquipService = new CreateEquipService();

			const equipamento = await createEquipService.execute({
				nome,
				tipo,
				usuario_id,
			});

			return res.status(201).json({
				success: true,
				data: {
					id: equipamento.ext_id,
					nome: equipamento.nome,
					tipo: equipamento.tipo,
					criado_em: equipamento.created_at,
				},
			});
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
			}

			console.error("Erro no EquipamentoController:", error);
			return res.status(500).json({
				success: false,
				message: "Erro ao criar equipamento",
			});
		}
	}

	public async createTraining(req: Request, res: Response): Promise<Response> {
		try {
			const { equipamento_id, movimento, peso, repeticoes, series } = req.body;
			const usuario_id = getExtIdFromToken(req.headers.authorization as string);

			const createTrainingService = new CreateTrainingService();

			const treino = await createTrainingService.execute({
				equipamento_id,
				movimento,
				peso,
				repeticoes,
				series,
				usuario_id,
			});

			return res.status(201).json({
				success: true,
				data: treino,
			});
		} catch (error) {
			if (error instanceof AppError) {
				return res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
			}

			console.error("Erro no EquipamentoController:", error);
			return res.status(500).json({
				success: false,
				message: "Erro ao criar treino",
			});
		}
	}

	public async getTreinos(req: Request, res: Response): Promise<Response> {
		try {
			const usuario_id = getExtIdFromToken(req.headers.authorization as string);
			const getTrainingService = new GetTrainingService();
			const trainings = await getTrainingService.execute({
				usuario_id,
			});

			return res.status(200).json(trainings);
		} catch (error) {
			console.error("Erro no EquipamentoController:", error);
			return res.status(500).json({
				success: false,
				message: "Erro ao buscar treinos",
			});
		}
	}
}
