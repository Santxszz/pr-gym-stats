import type { Request, Response, NextFunction } from "express";

import jwtToken from "jsonwebtoken";
import AppError from "@api/v1/utils/ApiError";

export default async function userAutenticated(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const jwt = req.headers.authorization;
	const bearerToken = jwt?.split(" ")[1];
	if (!jwt) {
		throw new AppError("Token not informed!", 404);
	}
	await jwtToken.verify(
		String(bearerToken),
		process.env.JWT_SECRET as string,
		(err) => {
			if (err) {
				throw new AppError("Token provided is invalid!", 403);
			}

			next();
		},
	);
}
