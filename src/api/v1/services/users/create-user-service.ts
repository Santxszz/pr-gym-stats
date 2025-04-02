import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";

interface IUser {
	name: string;
	email: string;
}

export default class CreateUserService {
	public async execute({ name, email }: IUser) {
		const userExists = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (userExists.length > 0) {
			throw new AppError("User already exists", 409);
		}

		const userCreate = await db.insert(usersTable).values({ name, email });

		return userCreate;
	}
}
