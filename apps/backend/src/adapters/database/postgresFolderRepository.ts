import { db } from '@/infrastructures/db';
import { folders } from '@/domain/entities/folder';
import type { Folder, NewFolder } from '@/domain/entities/folder';
import { eq, isNull, and } from 'drizzle-orm';
import { getUnixTimestamp } from '@/utils/utils';

export class PostgresFolderRepository {
    async create(folder: NewFolder): Promise<Folder> {
        var now = getUnixTimestamp();
        folder.createdAt = now
        folder.updatedAt = now

        const result = await db.insert(folders)
            .values(folder)
            .returning();
        
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error("Folder creation failed");
        }
        return result[0]; 
    }    

    async getAll(): Promise<Folder[]> {
        const result = await db.select().from(folders).where(isNull(folders.deletedAt));
        return Array.isArray(result) ? result : []; 
    }

    async getById(id: number): Promise<Folder | undefined> {
        const result = await db
            .select()
            .from(folders)
            .where(and(eq(folders.id, id), isNull(folders.deletedAt)));
    
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }
    

    async update(id: number, updateData: Partial<NewFolder>): Promise<Folder | undefined> {
        updateData.updatedAt = getUnixTimestamp();
        const result = await db
            .update(folders)
            .set(updateData)
            .where(eq(folders.id, id))
            .returning();
        
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db
            .update(folders)
            .set({ deletedAt: getUnixTimestamp() }) 
            .where(and(eq(folders.id, id), isNull(folders.deletedAt)))
            .returning();

        return Array.isArray(result) && result.length > 0;
    }
}
