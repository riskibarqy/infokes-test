import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const files = pgTable("files", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    folderId: integer("folder_id"), 
    createdAt: integer("created_at").default(Math.floor(Date.now() / 1000)), 
    updatedAt: integer("updated_at").default(Math.floor(Date.now() / 1000)),
    deletedAt: integer("deleted_at"), 
});

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
