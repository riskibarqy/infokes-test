import type { Folder, NewFolder } from "@/domain/entities/folder";
import type { FolderRepository } from "@/domain/repositories/folder_repository";

export class FolderUsecase {
    constructor(private folderRepository: FolderRepository) {}

    async createFolder(folder: NewFolder): Promise<Folder> {
        return await this.folderRepository.create(folder);
    }    

    async getAllFolders(): Promise<Folder[]> {
        return await this.folderRepository.getAll();
    }

    async getFolderById(id: number): Promise<Folder | undefined> {
        return await this.folderRepository.getById(id);
    }

    async updateFolder(id: number, updateData: Partial<NewFolder>): Promise<Folder | undefined> {
        return await this.folderRepository.update(id, updateData);
    }

    async deleteFolder(id: number): Promise<boolean> {
        return await this.folderRepository.delete(id);
    }
}
