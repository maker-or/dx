CREATE TABLE IF NOT EXISTS "gallery_dod" (
	"doId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gallery_dod_doId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar(1024) NOT NULL,
	"task" varchar(255) NOT NULL,
	"completed" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "dod_idx" ON "gallery_dod" USING btree ("userId");