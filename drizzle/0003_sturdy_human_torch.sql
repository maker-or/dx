DROP INDEX IF EXISTS "use_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_idx" ON "gallery_folders" USING btree ("userId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "use_idx" ON "gallery_tasks" USING btree ("userId");