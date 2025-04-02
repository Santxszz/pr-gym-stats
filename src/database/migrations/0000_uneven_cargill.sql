CREATE TABLE "equipamentos" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"nome" text NOT NULL,
	"tipo" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "musculos_treino" (
	"treino_id" text NOT NULL,
	"musculo" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "treinos" (
	"id" serial NOT NULL,
	"ext_id" text PRIMARY KEY NOT NULL,
	"usuario_id" text NOT NULL,
	"equipamento_id" text,
	"movimento" text NOT NULL,
	"peso" integer NOT NULL,
	"repeticoes" integer NOT NULL,
	"series" integer DEFAULT 3 NOT NULL,
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
	"street" text NOT NULL,
	"street_number" text NOT NULL,
	"neighborhood" text NOT NULL,
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
ALTER TABLE "equipamentos" ADD CONSTRAINT "equipamentos_usuario_id_users_table_ext_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "musculos_treino" ADD CONSTRAINT "musculos_treino_treino_id_treinos_ext_id_fk" FOREIGN KEY ("treino_id") REFERENCES "public"."treinos"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_usuario_id_users_table_ext_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_equipamento_id_equipamentos_ext_id_fk" FOREIGN KEY ("equipamento_id") REFERENCES "public"."equipamentos"("ext_id") ON DELETE set null ON UPDATE no action;