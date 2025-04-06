import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";

interface IUserInfo {
	userId: string;
}

export default class GetUserIMCService {
	public async execute({ userId }: IUserInfo) {

		console.log(userId)
		console.log(">>>>>>>>>>>>>>>>")

		const userIdExists = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, userId))
			.limit(1);

		if (userIdExists.length < 1) {
			throw new AppError("User not found", 404);
		}

		const userInfo = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.ext_id, userId))
			.limit(1);

		const imc =
			userInfo[0].weight /
			((userInfo[0].height / 100) * (userInfo[0].height / 100));
		let imcCategory = "";
		let recommendation = "";

		if (imc < 18.5) {
			imcCategory = "O seu peso está abaixo do normal";
			recommendation =
				"Você deve ganhar peso para atingir um IMC saudável. Consulte um nutricionista para orientações personalizadas.";
		} else if (imc >= 18.5 && imc < 24.9) {
			imcCategory = "Peso normal";
			recommendation =
				"Você está com um peso saudável. Continue mantendo hábitos saudáveis.";
		} else if (imc >= 25 && imc < 29.9) {
			imcCategory = "Sobrepeso";
			recommendation =
				"Você está acima do peso ideal. Considere adotar uma dieta equilibrada e praticar exercícios físicos regularmente.";
		} else {
			imcCategory = "Obesidade";
			recommendation =
				"Você está com obesidade. É importante buscar orientação médica e nutricional para um plano de emagrecimento saudável.";
		}

		return {
			id: userInfo[0].id,
			full_name: userInfo[0].full_name,
			nick_name: userInfo[0].nick_name,
			imcCategory,
			recommendation,
			imc: Number(imc.toFixed(2)),
			observations:
				"Apenas uma observação, o IMC é uma medida que pode não ser precisa para todos os indivíduos, especialmente atletas ou pessoas com alta massa muscular. É sempre bom consultar um profissional de saúde para uma avaliação mais completa.",
		};
	}
}
