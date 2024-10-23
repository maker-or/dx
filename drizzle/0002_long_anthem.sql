ALTER TABLE "gallery_folders" ALTER COLUMN "folderId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "gallery_folders" ALTER COLUMN "folderId" ADD GENERATED ALWAYS AS IDENTITY (sequence name "gallery_folders_folderId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "gallery_post" ALTER COLUMN "id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "gallery_post" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (sequence name "gallery_post_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "gallery_tasks" ALTER COLUMN "taskId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "gallery_tasks" ALTER COLUMN "taskId" ADD GENERATED ALWAYS AS IDENTITY (sequence name "gallery_tasks_taskId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "gallery_post" ADD COLUMN "folderId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gallery_post" ADD CONSTRAINT "gallery_post_folderId_gallery_folders_folderId_fk" FOREIGN KEY ("folderId") REFERENCES "public"."gallery_folders"("folderId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
