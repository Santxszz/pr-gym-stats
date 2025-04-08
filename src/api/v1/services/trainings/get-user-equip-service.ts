import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { equipment, usersTable } from "@database/schema";
import { and, eq } from "drizzle-orm";

interface IUserInfo {
	user_id: string;
}

export default class GetUserEquipService {
	public async execute({ user_id }: IUserInfo) {
		const userInfo = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, user_id))
			.limit(1);

		if (userInfo.length < 1) {
			throw new AppError("User not found.", 404);
		}

		const userEquip = await db
			.select()
			.from(equipment)
			.where(eq(equipment.user_id, user_id));

		if (userEquip.length < 1) {
			throw new AppError("No equipment found.", 404);
		}

		return userEquip;
	}
}
