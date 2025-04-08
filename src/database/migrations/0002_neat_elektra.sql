ALTER TABLE "musculos_treino" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "musculos_treino" CASCADE;--> statement-breakpoint
ALTER TABLE "equipamentos" RENAME COLUMN "usuario_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "equipamentos" RENAME COLUMN "nome" TO "name";--> statement-breakpoint
ALTER TABLE "equipamentos" RENAME COLUMN "tipo" TO "equipament_kind";--> statement-breakpoint
ALTER TABLE "treinos" RENAME COLUMN "usuario_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "treinos" RENAME COLUMN "equipamento_id" TO "equipament_id";--> statement-breakpoint
ALTER TABLE "equipamentos" DROP CONSTRAINT "equipamentos_usuario_id_users_table_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "treinos" DROP CONSTRAINT "treinos_usuario_id_users_table_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "treinos" DROP CONSTRAINT "treinos_equipamento_id_equipamentos_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "equipamentos" ADD CONSTRAINT "equipamentos_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "treinos" ADD CONSTRAINT "treinos_equipament_id_equipamentos_ext_id_fk" FOREIGN KEY ("equipament_id") REFERENCES "public"."equipamentos"("ext_id") ON DELETE set null ON UPDATE no action;