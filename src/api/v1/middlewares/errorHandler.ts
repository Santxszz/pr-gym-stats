import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/ApiError";

const errorHandler = (
	error: Error,
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	if (process.env.NODE_ENV === "development") {
		console.error("\x1b[31m", "⚠️ --- Error Handler ---");
		console.error("\x1b[31m", `📛 Error: ${error.message}`);
		console.error("\x1b[33m", `📌 Stack: ${error.stack}`);
		console.error("\x1b[35m", `🌐 Path: ${request.path}`);
		console.error("\x1b[36m", `🔍 Method: ${request.method}`);
		console.error("\x1b[0m"); // Reset cor
	}

	if (error instanceof AppError) {
		return response.status(error.statusCode).json({
			success: false,
			code: error.statusCode,
			status: error.statusMessage,
			message: error.message,
			...(process.env.NODE_ENV === "development" && {
				stack: error.stack,
				path: request.path,
			}),
		});
	}

	return response.status(500).json({
		success: false,
		code: 500,
		status: "Internal Server Error",
		message: "An unexpected server error occurred. Please try again later.",
		...(process.env.NODE_ENV === "development" && {
			stack: error.stack,
			path: request.path,
			originalError: {
				name: error.name,
				message: error.message,
			},
		}),
	});
};

export default errorHandler;
