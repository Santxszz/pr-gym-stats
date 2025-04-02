CREATE TABLE "users_table" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nickname" text NOT NULL,
	"email" text NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"age" integer NOT NULL,
	"password" text NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
