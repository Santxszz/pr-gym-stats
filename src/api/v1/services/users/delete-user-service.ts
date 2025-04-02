import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";

interface IUserInfo {
	userId: string;
}

export default class DeleteUserService {
	public async execute({ userId }: IUserInfo) {
		const [userExists] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, userId))
			.limit(1);

		if (!userExists) {
			throw new AppError("User not found", 404);
		}

		const [deletedUser] = await db
			.delete(usersTable)
			.where(eq(usersTable.ext_id, userId))
			.returning();

		return deletedUser;
	}
}
