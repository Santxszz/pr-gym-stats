import AppError from "@utils/ApiError";
import bcrypt from "bcrypt";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";

interface IUpdateUser {
	userId: string;
	full_name?: string;
	nick_name?: string;
	email?: string;
	height?: number;
	weight?: number;
	age?: number;
	password?: string;
}

export default class UpdateUserService {
	public async execute({ userId, ...updateData }: IUpdateUser) {
		const [userExists] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, userId))
			.limit(1);

		if (!userExists) {
			throw new AppError("User not found", 404);
		}

		if (updateData.email && updateData.email !== userExists.email) {
			const [emailExists] = await db
				.select()
				.from(usersTable)
				.where(eq(usersTable.email, updateData.email))
				.limit(1);

			if (emailExists) {
				throw new AppError("Email already in use", 409);
			}
		}

		if (updateData.password) {
			updateData.password = await bcrypt.hash(updateData.password, 10);
		}

		const [updatedUser] = await db
			.update(usersTable)
			.set({
				...updateData,
				updated_at: new Date(),
			})
			.where(eq(usersTable.ext_id, userId))
			.returning();

		return {
			id: updatedUser.id,
			full_name: updatedUser.full_name,
			nick_name: updatedUser.nick_name,
			email: updatedUser.email,
			height: updatedUser.height,
			weight: updatedUser.weight,
			age: updatedUser.age,
			created_at: updatedUser.created_at,
			updated_at: updatedUser.updated_at,
		};
	}
}
