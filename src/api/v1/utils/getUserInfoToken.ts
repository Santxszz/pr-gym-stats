import jwt from "jsonwebtoken";
import AppError from "@api/v1/utils/ApiError";

interface JwtPayload {
	ext_id?: string;
	id?: string;
}


export function getExtIdFromToken(token: string): string {
	try {
		// Remove o 'Bearer ' se existir
		const cleanToken = token.replace(/^Bearer\s+/i, "");

		// Decodifica o token SEM verificar a assinatura (não use para autenticação!)
		const decoded = jwt.decode(cleanToken) as JwtPayload;

		if (!decoded) {
			throw new AppError("Token inválido: não foi possível decodificar", 400);
		}

		// Tenta obter o ext_id ou id do payload
		const extId = decoded.ext_id || decoded.id;

		if (!extId) {
			throw new AppError("Token não contém um identificador de usuário", 400);
		}

		return extId;
	} catch (error) {
		// Melhora a mensagem de erro para tokens inválidos
		if (error instanceof jwt.JsonWebTokenError) {
			throw new AppError("Token JWT malformado", 400);
		}
		throw error;
	}
}
