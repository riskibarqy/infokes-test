CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"folder_id" integer,
	"created_at" integer DEFAULT 1741205774,
	"updated_at" integer DEFAULT 1741205774,
	"deleted_at" integer
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"parent_id" integer,
	"created_at" integer DEFAULT 1741205774,
	"updated_at" integer DEFAULT 1741205774,
	"deleted_at" integer
);
--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_id_folders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;