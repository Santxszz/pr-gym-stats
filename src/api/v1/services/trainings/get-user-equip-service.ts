import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipamentos, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	usuario_id: string;
}

export default class GetUserEquipService {
	public async execute({ usuario_id }: IUserInfo) {
		const userInfo = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, usuario_id))
			.limit(1);

		if (userInfo.length < 1) {
			throw new AppError("Usuário não encontrado", 404);
		}

		const userEquip = await db
			.select()
			.from(equipamentos)
			.where(eq(equipamentos.usuario_id, usuario_id));

		if (userEquip.length < 1) {
			throw new AppError("Nenhum equipamento encontrado", 404);
		}

		return userEquip;
	}
}
