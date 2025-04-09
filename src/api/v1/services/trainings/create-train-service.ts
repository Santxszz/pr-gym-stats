import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipment, trainings, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	equipament_id: string;
	moviment: string;
	weight: number;
	repetitions: number;
	series: number;
	muscle: string;
	user_id: string;
}

export default class CreateTrainingService {
	public async execute({
		equipament_id,
		moviment,
		weight,
		repetitions,
		series,
		muscle,
		user_id,
	}: IUserInfo) {
		const [equipamentoExistente] = await db
			.select()
			.from(equipment)
			.where(
				and(
					eq(equipment.ext_id, equipament_id),
					eq(equipment.user_id, user_id),
				),
			)
			.limit(1);

		if (!equipamentoExistente) {
			throw new AppError("Equipment not found.", 404);
		}

		const newTraining = await db
			.insert(trainings)
			.values({
				equipament_id,
				moviment,
				weight,
				repetitions,
				series,
				muscle,
				user_id,
			})
			.returning();

		if (!newTraining) {
			throw new AppError("Failed to create workout.", 500);
		}

		return newTraining;
	}
}
