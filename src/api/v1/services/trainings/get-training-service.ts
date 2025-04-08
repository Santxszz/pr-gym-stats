import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipamentos, treinos, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	usuario_id: string;
}

export default class GetTrainingService {
	public async execute({ usuario_id }: IUserInfo) {
		const treinosExistente = await db
			.select()
			.from(treinos)
			.where(and(eq(treinos.usuario_id, usuario_id)));

		if (!treinosExistente) {
			throw new AppError("Você não possui treinos cadastrados", 404);
		}

		return treinosExistente;
	}
}
