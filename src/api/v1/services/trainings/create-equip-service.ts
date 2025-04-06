import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipamentos, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	nome: string;
	tipo: string;
	usuario_id: string;
}

export default class CreateEquipService {
	public async execute({ nome, tipo, usuario_id }: IUserInfo) {
		const [equipamentoExistente] = await db
			.select()
			.from(equipamentos)
			.where(
				and(
					eq(equipamentos.usuario_id, usuario_id),
					eq(equipamentos.nome, nome),
				),
			)
			.limit(1);

		if (equipamentoExistente) {
			throw new AppError("Você já tem um equipamento com este nome", 409);
		}

		// Tipos válidos (pode ser um enum também)
		const tiposValidos = ["Máquina", "Livre", "Acessório", "Barra", "Haltere"];
		if (!tiposValidos.includes(tipo)) {
			throw new AppError(`Tipo inválido. Use: ${tiposValidos.join(", ")}`, 400);
		}

		// Cria o equipamento
		const [novoEquipamento] = await db
			.insert(equipamentos)
			.values({
				nome,
				tipo,
				usuario_id,
			})
			.returning();

		if (!novoEquipamento) {
			throw new AppError("Falha ao criar equipamento", 500);
		}

		return novoEquipamento;
	}
}
