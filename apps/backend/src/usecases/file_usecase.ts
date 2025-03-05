import type { File, NewFile } from "@/domain/entities/file";
import type { FileRepository } from "@/domain/repositories/file_repository";

export class FileUsecase {
    constructor(private fileRepository: FileRepository) {}

    async createFile(file: NewFile): Promise<File> {
        return await this.fileRepository.create(file);
    }    

    async getAllFiles(): Promise<File[]> {
        return await this.fileRepository.getAll();
    }

    async getFileById(id: number): Promise<File | undefined> {
        return await this.fileRepository.getById(id);
    }

    async updateFile(id: number, updateData: Partial<NewFile>): Promise<File | undefined> {
        return await this.fileRepository.update(id, updateData);
    }

    async deleteFile(id: number): Promise<boolean> {
        return await this.fileRepository.delete(id);
    }
}
