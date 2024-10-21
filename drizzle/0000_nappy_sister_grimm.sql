CREATE TABLE IF NOT EXISTS "gallery_post" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"userId" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"url" varchar(1024) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gallery_tasks" (
	"taskId" serial PRIMARY KEY NOT NULL,
	"userId" varchar(1024) NOT NULL,
	"task" varchar(255) NOT NULL,
	"date" varchar NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "gallery_post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "gallery_tasks" USING btree ("userId");