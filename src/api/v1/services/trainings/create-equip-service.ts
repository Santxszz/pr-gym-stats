import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipment, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	name: string;
	equipament_kind: string;
	user_id: string;
}

export default class CreateEquipService {
	public async execute({ name, equipament_kind, user_id }: IUserInfo) {
		const [equipamentoExistente] = await db
			.select()
			.from(equipment)
			.where(
				and(
					eq(equipment.user_id, user_id),
					eq(equipment.name, name),
				),
			)
			.limit(1);

		if (equipamentoExistente) {
			throw new AppError("You already have a device with this name.", 409);
		}

		const validTypes = ["Máquina", "Livre", "Acessório", "Barra", "Haltere"];
		if (!validTypes.includes(equipament_kind)) {
			throw new AppError(`Invalid type! Try: ${validTypes.join(", ")}`, 400);
		}

		const [novoEquipamento] = await db
			.insert(equipment)
			.values({
				name,
				equipament_kind,
				user_id
			})
			.returning();

		if (!novoEquipamento) {
			throw new AppError("Failed to create equipment.", 500);
		}

		return novoEquipamento;
	}
}
