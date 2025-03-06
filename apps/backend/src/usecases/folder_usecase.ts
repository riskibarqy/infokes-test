import type { Folder, NewFolder } from "@/domain/entities/folder";
import type { FileRepository } from "@/domain/repositories/file_repository";
import type { FolderRepository } from "@/domain/repositories/folder_repository";

export class FolderUsecase {
    constructor(private folderRepository: FolderRepository, private fileRepository : FileRepository) {}

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

    async getFolderTree(): Promise<any> {
        const folderList = await this.folderRepository.getAll(); 
        const fileList = await this.fileRepository.getAll(); 

        const folderMap = new Map<number, any>();
        folderList.forEach(folder => {
            folderMap.set(folder.id, { ...folder, children: [], files: [] });
        });

        const rootFolders: any[] = [];
        folderList.forEach(folder => {
            if (folder.parentId === null) {
                rootFolders.push(folderMap.get(folder.id));
            } else {
                const parentFolder = folderMap.get(folder.parentId ?? 0);
                if (parentFolder) {
                    parentFolder.children.push(folderMap.get(folder.id));
                }
            }
        });

        fileList.forEach(file => {
            const parentFolder = folderMap.get(file.folderId ?? 0);
            if (parentFolder) {
                parentFolder.files.push(file);
            }
        });
    
    
        return rootFolders; 
    }    
}
