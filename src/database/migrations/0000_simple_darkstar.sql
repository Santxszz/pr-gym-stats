CREATE TABLE "equipaments" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"equipament_kind" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "trainings" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"equipament_id" text,
	"movimento" text NOT NULL,
	"peso" integer NOT NULL,
	"repeticoes" integer NOT NULL,
	"series" integer DEFAULT 3 NOT NULL,
	"muscle" text NOT NULL,
	"data" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"nickname" text NOT NULL,
	"email" text NOT NULL,
	"height" integer NOT NULL,
	"weight" integer NOT NULL,
	"age" integer NOT NULL,
	"zip_code" text NOT NULL,
	"street" text,
	"street_number" text,
	"neighborhood" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"password" text NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "equipaments" ADD CONSTRAINT "equipaments_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_equipament_id_equipaments_ext_id_fk" FOREIGN KEY ("equipament_id") REFERENCES "public"."equipaments"("ext_id") ON DELETE set null ON UPDATE no action;