import type { FileUsecase } from "@/usecases/file_usecase";
import type { File, NewFile } from "@/domain/entities/file";

export class FileController {
    constructor(private fileUsecase: FileUsecase) {}

    getAll = async () => { 
        return await this.fileUsecase.getAllFiles();
    };

    create = async ({ body, set }: { body: NewFile; set: any }) => {
        try {
            const newFile = body as NewFile;
            const createdFile = await this.fileUsecase.createFile(newFile);
            return { success: true, file: createdFile };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };

    getById = async ({ params }: { params: { id: string } }) => { 
        const file = await this.fileUsecase.getFileById(Number(params.id));     
        if (!file) { 
            return { success: false, message: "File not found" };
        }
    
        return { success: true, data: file };
    };

    update = async ({ params, body, set }: { params: { id: number }; body: Partial<NewFile>; set: any }) => {
        try {
            const updatedFile = await this.fileUsecase.updateFile(params.id, body);
            if (!updatedFile) {
                set.status = 404;
                return { success: false, message: "File not found or could not be updated" };
            }
            return { success: true, file: updatedFile };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };

    delete = async ({ params, set }: { params: File; set: any }) => { 
        try {
            const success = await this.fileUsecase.deleteFile(Number(params.id));
            if (!success) {
                set.status = 404;
                return { success: false, message: "File not found or could not be deleted" };
            }
            return { success: true, message: "File deleted successfully" };
        } catch (error) {
            set.status = 500;
            return { success: false, message: error instanceof Error ? error.message : "Unknown error" };
        }
    };
}
