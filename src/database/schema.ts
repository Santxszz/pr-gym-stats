import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

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
	zip_code: text("zip_code").notNull(),
	street: text("street"),
	street_number: text("street_number"),
	neighborhood: text("neighborhood"),
	city: text("city").notNull(),
	state: text("state").notNull(), // TODO: Add

	// User Security
	password: text("password").notNull(),

	// User Active
	is_active: integer("is_active").notNull().default(1), // 1 = true, 0 = false

	// Timestamps
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
	deleted_at: timestamp("deleted_at").notNull().defaultNow(),
});

export const equipment = pgTable("equipaments", {
	id: serial("id"),
	ext_id: text("ext_id")
		.primaryKey()
		.$defaultFn(() => createId()),
	user_id: text("user_id")
		.notNull()
		.references(() => usersTable.ext_id, { onDelete: "cascade" }),
	name: text("name").notNull(),
	equipament_kind: text("equipament_kind").notNull(), // "Máquina", "Livre"
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const trainings = pgTable("trainings", {
	id: serial("id"),
	ext_id: text("ext_id")
		.primaryKey()
		.$defaultFn(() => createId()),
	user_id: text("user_id")
		.notNull()
		.references(() => usersTable.ext_id, { onDelete: "cascade" }),
	equipament_id: text("equipament_id").references(() => equipment.ext_id, {
		onDelete: "set null",
	}),
	moviment: text("movimento").notNull(),
	weight: integer("peso").notNull(),
	repetitions: integer("repeticoes").notNull(),
	series: integer("series").notNull().default(3),
	date: timestamp("data").notNull().defaultNow(),
	created_at: timestamp("created_at").notNull().defaultNow(),
	updated_at: timestamp("updated_at").notNull().defaultNow(),
});
