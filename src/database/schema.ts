import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { is } from "drizzle-orm";

export const usersTable = pgTable("users_table", {
	// Id's
	id: serial("id"),
	ext_id: text("ext_id")
		.primaryKey()
		.$defaultFn(() => createId()),

	// User Info
	full_name: text("name").notNull(),
	nick_name: text("nickname").notNull(),

	// User Contact
	email: text("email").notNull().unique(),

	// User Health Stats
	height: integer("height").notNull(),
	weight: integer("weight").notNull(),
	age: integer("age").notNull(),

	// User Address
	// zip_code: text("zip_code").notNull(),
	// street: text("street").notNull(),
	// street_number: text("street_number").notNull(),
	// neighborhood: text("neighborhood").notNull(),
	// city: text("city").notNull(),
	// state: text("state").notNull(), // TODO: Add

	// User Security
	password: text("password").notNull(),

	// User Active
	is_active: integer("is_active").notNull().default(1), // 1 = true, 0 = false

	// Timestamps
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
	deleted_at: timestamp("deleted_at").notNull().defaultNow(),
});

export const equipamentos = pgTable("equipamentos", {
	id: serial("id"),
	ext_id: text("ext_id")
		.primaryKey()
		.$defaultFn(() => createId()),
	usuario_id: text("usuario_id")
		.notNull()
		.references(() => usersTable.ext_id, { onDelete: "cascade" }),
	nome: text("nome").notNull(),
	tipo: text("tipo").notNull(), // "Máquina", "Livre", "Acessório"
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const treinos = pgTable("treinos", {
	id: serial("id"),
	ext_id: text("ext_id")
		.primaryKey()
		.$defaultFn(() => createId()),
	usuario_id: text("usuario_id")
		.notNull()
		.references(() => usersTable.ext_id, { onDelete: "cascade" }),
	equipamento_id: text("equipamento_id").references(() => equipamentos.ext_id, {
		onDelete: "set null",
	}),
	movimento: text("movimento").notNull(),
	peso: integer("peso").notNull(),
	repeticoes: integer("repeticoes").notNull(),
	series: integer("series").notNull().default(3),
	data: timestamp("data").notNull().defaultNow(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const musculos_treino = pgTable("musculos_treino", {
	treino_id: text("treino_id")
		.notNull()
		.references(() => treinos.ext_id, { onDelete: "cascade" }),
	musculo: text("musculo").notNull(),
});
