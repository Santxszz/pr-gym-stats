import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface IUserPayload {
	email: string;
	password: string;
}

export default class AuthUserService {
	public async execute({ email, password }: IUserPayload) {
		const userExists = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email))
			.limit(1);

		if (userExists.length < 1) {
			throw new AppError("User not found", 404);
		}

		const passwordMatch = await bcrypt.compare(
			password,
			userExists[0].password,
		);
		if (!passwordMatch) {
			throw new AppError("Invalid password", 401);
		}

		const userInfo = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email) && eq(usersTable.password, password))
			.limit(1);
		if (!userInfo) {
			throw new AppError("User not found", 404);
		}

		const tokenPayload = {
			full_name: userExists[0].full_name,
			nick_name: userExists[0].nick_name,
			email: userExists[0].email,
			id: userExists[0].id,
			ext_id: userExists[0].ext_id,
		};

		const userToken = await jwt.sign(tokenPayload, process.env.JWT_SECRET as string, {
			expiresIn: "12h",
		});

		return userToken;
	}
}
