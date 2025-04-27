import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipment } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	user_id: string;
}

export default class GetEquipamentService {
	public async execute({ user_id }: IUserInfo) {
		const equipamentsRegistred = await db
			.select()
			.from(equipment)
			.where(and(eq(equipment.user_id, user_id)));

		if (!equipamentsRegistred) {
			throw new AppError("You do not have any equipaments registred.", 404);
		}

		return equipamentsRegistred;
	}
}
