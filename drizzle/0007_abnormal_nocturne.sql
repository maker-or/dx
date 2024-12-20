ALTER TABLE "gallery_dod" ALTER COLUMN "doId" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "gallery_post" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "gallery_tasks" ALTER COLUMN "taskId" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "gallery_tasks" ADD COLUMN "month" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "gallery_tasks" ADD COLUMN "year" varchar NOT NULL;