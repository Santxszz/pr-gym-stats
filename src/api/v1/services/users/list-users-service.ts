import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";

export default class ListUsersService {
	public async execute() {
		const usersList = await db.select().from(usersTable);
		return usersList;
	}
}
