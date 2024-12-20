ALTER TABLE "gallery_dod" ALTER COLUMN "doId" SET DEFAULT nextval('gallery_tasks_tasksId_seq');--> statement-breakpoint
ALTER TABLE "gallery_dod" ALTER COLUMN "doId" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gallery_folders" ALTER COLUMN "folderId" SET DEFAULT nextval('gallery_folders_folderId_seq');--> statement-breakpoint
ALTER TABLE "gallery_folders" ALTER COLUMN "folderId" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gallery_post" ALTER COLUMN "id" SET DEFAULT nextval('gallery_post_id_seq');--> statement-breakpoint
ALTER TABLE "gallery_post" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "gallery_tasks" ALTER COLUMN "taskId" SET DEFAULT nextval('gallery_tasks_tasksId_seq');--> statement-breakpoint
ALTER TABLE "gallery_tasks" ALTER COLUMN "taskId" DROP IDENTITY;