import type { Request, Response } from "express";
import { db } from "@database/db";
import { equipamentos } from "@database/schema";
import AppError from "@utils/ApiError";
import CreateEquipService from "@api/v1/services/trainings/create-equip-service";

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
}
