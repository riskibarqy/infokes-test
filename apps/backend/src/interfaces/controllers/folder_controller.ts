import type { FolderUsecase } from "@/usecases/folder_usecase";
import type { Folder, NewFolder } from "@/domain/entities/folder";

export class FolderController {
    constructor(private folderUsecase: FolderUsecase) {}

    getAll = async () => { 
        return await this.folderUsecase.getAllFolders();
    };

    create = async ({ body, set }: { body: NewFolder; set: any }) => {
        try {
            const newFolder = body as NewFolder;
            const createdFolder = await this.folderUsecase.createFolder(newFolder);
            return { success: true, folder: createdFolder };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };

    getById = async ({ params }: { params: { id: string } }) => { 
        const folder = await this.folderUsecase.getFolderById(Number(params.id));     
        if (!folder) { 
            return { success: false, message: "Folder not found" };
        }
    
        return { success: true, data: folder };
    };

    update = async ({ params, body, set }: { params: { id: number }; body: Partial<NewFolder>; set: any }) => {
        try {
            const updatedFolder = await this.folderUsecase.updateFolder(params.id, body);
            if (!updatedFolder) {
                set.status = 404;
                return { success: false, message: "Folder not found or could not be updated" };
            }
            return { success: true, folder: updatedFolder };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };

    delete = async ({ params, set }: { params: Folder; set: any }) => { 
        try {
            const success = await this.folderUsecase.deleteFolder(Number(params.id));
            if (!success) {
                set.status = 404;
                return { success: false, message: "Folder not found or could not be deleted" };
            }
            return { success: true, message: "Folder deleted successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };

    getFolderTree = async () => { 
        return await this.folderUsecase.getFolderTree();
    };
}
