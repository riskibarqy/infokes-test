import type { Folder, NewFolder } from "@/domain/entities/folder";

export interface FolderRepository {
    create(folder: NewFolder): Promise<Folder>;
    getAll(): Promise<Folder[]>;
    getById(id: number): Promise<Folder | undefined>;
    update(id: number, updateData: Partial<NewFolder>): Promise<Folder | undefined>;
    delete(id: number): Promise<boolean>;
}
