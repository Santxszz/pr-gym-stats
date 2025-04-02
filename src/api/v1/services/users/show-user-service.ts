import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";

interface IUserInfo {
	userId: number;
}

export default class ShowUserService {
	public async execute({ userId }: IUserInfo) {
		const userInfo = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.id, userId))
			.limit(1);
		if (!userInfo) {
			throw new AppError("User not found", 404);
		}
		return userInfo[0];
	}
}
