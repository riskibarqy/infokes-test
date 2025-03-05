import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const folders = pgTable("folders", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    parentId: integer("parent_id").references(() => folders.id, { onDelete: "cascade" }), 
    createdAt: integer("created_at").default(Math.floor(Date.now() / 1000)), 
    updatedAt: integer("updated_at").default(Math.floor(Date.now() / 1000)),
    deletedAt: integer("deleted_at"), 
});

export type Folder = typeof folders.$inferSelect;
export type NewFolder = typeof folders.$inferInsert;
