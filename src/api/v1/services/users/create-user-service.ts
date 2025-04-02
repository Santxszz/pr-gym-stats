import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

interface ICreateUser {
	full_name: string;
	nick_name: string;
	email: string;
	height: number;
	weight: number;
	age: number;
	password: string;
}

export default class CreateUserService {
	public async execute({
		full_name,
		nick_name,
		email,
		height,
		weight,
		age,
		password,
	}: ICreateUser) {
		const [userExists] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (userExists) {
			throw new AppError("User already exists", 409);
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const [createdUser] = await db
			.insert(usersTable)
			.values({
				full_name,
				nick_name,
				email,
				height,
				weight,
				age,
				password: hashedPassword,
			})
			.returning();

		if (!createdUser) {
			throw new AppError("Failed to create user", 500);
		}

		return {
			id: createdUser.id,
			full_name: createdUser.full_name,
			nick_name: createdUser.nick_name,
			email: createdUser.email,
			height: createdUser.height,
			weight: createdUser.weight,
			age: createdUser.age,
			created_at: createdUser.created_at,
			updated_at: createdUser.updated_at,
		};
	}
}
