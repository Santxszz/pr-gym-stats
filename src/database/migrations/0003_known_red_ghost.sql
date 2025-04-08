ALTER TABLE "equipamentos" RENAME TO "equipaments";--> statement-breakpoint
ALTER TABLE "treinos" RENAME TO "trainings";--> statement-breakpoint
ALTER TABLE "equipaments" DROP CONSTRAINT "equipamentos_user_id_users_table_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "trainings" DROP CONSTRAINT "treinos_user_id_users_table_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "trainings" DROP CONSTRAINT "treinos_equipament_id_equipamentos_ext_id_fk";
--> statement-breakpoint
ALTER TABLE "equipaments" ADD CONSTRAINT "equipaments_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_user_id_users_table_ext_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users_table"("ext_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "trainings" ADD CONSTRAINT "trainings_equipament_id_equipaments_ext_id_fk" FOREIGN KEY ("equipament_id") REFERENCES "public"."equipaments"("ext_id") ON DELETE set null ON UPDATE no action;