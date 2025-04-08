import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipamentos, treinos, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	equipamento_id: string;
	movimento: string;
	peso: number;
	repeticoes: number;
	series: number;
	usuario_id: string;
}

export default class CreateTrainingService {
	public async execute({
		equipamento_id,
		movimento,
		peso,
		repeticoes,
		series,
		usuario_id,
	}: IUserInfo) {
		const [equipamentoExistente] = await db
			.select()
			.from(equipamentos)
			.where(
				and(
					eq(equipamentos.ext_id, equipamento_id),
					eq(equipamentos.usuario_id, usuario_id),
				),
			)
			.limit(1);

		if (!equipamentoExistente) {
			throw new AppError("Equipamento não encontrado", 404);
		}

		const novoTreino = await db
			.insert(treinos)
			.values({
				movimento,
				peso,
				repeticoes,
				series,
				equipamento_id,
				usuario_id,
			})
			.returning();

		if (!novoTreino) {
			throw new AppError("Falha ao criar treino", 500);
		}

		return novoTreino;
	}
}
