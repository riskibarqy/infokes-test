import { db } from '@/infrastructures/db';
import { files } from '@/domain/entities/file';
import type { File, NewFile } from '@/domain/entities/file';
import { eq, isNull, and, isNotNull } from 'drizzle-orm';
import { getUnixTimestamp } from '@/utils/utils';

export class PostgresFileRepository {
    async create(file: NewFile): Promise<File> {
        var now = getUnixTimestamp();
        file.createdAt = now
        file.updatedAt = now

        const result = await db.insert(files)
            .values(file)
            .returning();
        
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error("File creation failed");
        }
        return result[0]; 
    }    

    async getAll(): Promise<File[]> {
        const result = await db.select().from(files).where(isNull(files.deletedAt));
        return Array.isArray(result) ? result : []; 
    }

    async getById(id: number): Promise<File | undefined> {
        const result = await db
            .select()
            .from(files)
            .where(and(eq(files.id, id), isNull(files.deletedAt)));
    
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }
    

    async update(id: number, updateData: Partial<NewFile>): Promise<File | undefined> {
        updateData.updatedAt = getUnixTimestamp();
        const result = await db
            .update(files)
            .set(updateData)
            .where(eq(files.id, id))
            .returning();
        
        return Array.isArray(result) && result.length > 0 ? result[0] : undefined;
    }

    async delete(id: number): Promise<boolean> {
        const result = await db
            .update(files)
            .set({ deletedAt: getUnixTimestamp() }) 
            .where(and(eq(files.id, id), isNotNull(files.deletedAt)))
            .returning();

        return Array.isArray(result) && result.length > 0;
    }
}
