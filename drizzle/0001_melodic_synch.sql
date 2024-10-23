CREATE TABLE IF NOT EXISTS "gallery_folders" (
	"folderId" serial PRIMARY KEY NOT NULL,
	"folderName" varchar(256) NOT NULL,
	"userId" varchar(1024) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "use_idx" ON "gallery_folders" USING btree ("userId");