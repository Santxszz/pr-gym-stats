import AppError from "@utils/ApiError";
import { db } from "@database/db";
import { usersTable } from "@database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import axios from "axios";

interface ICreateUser {
	full_name: string;
	nick_name: string;
	email: string;
	zip_code: string;
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
		zip_code,
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

		interface AddressData {
			logradouro: string;
			numero?: string;
			bairro: string;
			localidade: string;
			uf: string;
		}

		let addressData: AddressData = {
			logradouro: "",
			numero: undefined,
			bairro: "",
			localidade: "",
			uf: "",
		};
		await axios
			.get(`https://viacep.com.br/ws/${zip_code}/json/`)
			.then((response) => {
				addressData = response.data;
			});

		const [createdUser] = await db
			.insert(usersTable)
			.values({
				full_name,
				nick_name,
				email,
				height,
				weight,
				zip_code,
				street: addressData.logradouro,
				street_number: addressData.numero,
				neighborhood: addressData.bairro,
				city: addressData.localidade,
				state: addressData.uf,
				age,
				password: hashedPassword,
			})
			.returning();

		if (!createdUser) {
			throw new AppError("Failed to create user", 500);
		}

		console.log("User created successfully", createdUser);

		return {
			id: createdUser.id,
			full_name: createdUser.full_name,
			nick_name: createdUser.nick_name,
			email: createdUser.email,
			height: createdUser.height,
			weight: createdUser.weight,
			zip_code: createdUser.zip_code,
			street: createdUser.street,
			street_number: createdUser.street_number,
			neighborhood: createdUser.neighborhood,
			city: createdUser.city,
			state: createdUser.state,
			age: createdUser.age,
			created_at: createdUser.created_at,
			updated_at: createdUser.updated_at,
		};
	}
}
