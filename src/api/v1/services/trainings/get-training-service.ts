import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipment, trainings, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	user_id: string;
}

export default class GetTrainingService {
	public async execute({ user_id }: IUserInfo) {
		const trainingsRegistred = await db
			.select()
			.from(trainings)
			.where(and(eq(trainings.user_id, user_id)));

		if (!trainingsRegistred) {
			throw new AppError("You do not have any registered workouts.", 404);
		}

		return trainingsRegistred;
	}
}
