import type { File, NewFile } from "@/domain/entities/file";

export interface FileRepository {
    create(file: NewFile): Promise<File>;
    getAll(): Promise<File[]>;
    getById(id: number): Promise<File | undefined>;
    update(id: number, updateData: Partial<NewFile>): Promise<File | undefined>;
    delete(id: number): Promise<boolean>;
}
