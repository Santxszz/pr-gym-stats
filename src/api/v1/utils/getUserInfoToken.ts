import jwt from "jsonwebtoken";
import AppError from "@api/v1/utils/ApiError";

interface JwtPayload {
	ext_id?: string;
	id?: string;
}

export function getExtIdFromToken(token: string): string {
	try {
		const cleanToken = token.replace(/^Bearer\s+/i, "");

		const decoded = jwt.decode(cleanToken) as JwtPayload;

		if (!decoded) {
			throw new AppError("Invalid token: could not decode.", 400);
		}

		const extId = decoded.ext_id || decoded.id;

		if (!extId) {
			throw new AppError("Token does not contain a user identifier.", 400);
		}

		return extId;
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			throw new AppError("Malformed JWT token.", 400);
		}
		throw error;
	}
}
