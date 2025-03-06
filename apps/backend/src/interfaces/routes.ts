import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

import { FileController } from '@/interfaces/controllers/file_controller';
import { FileUsecase } from '@/usecases/file_usecase';
import { PostgresFileRepository } from '@/adapters/database/postgresFileRepository';
import { PostgresFolderRepository } from '@/adapters/database/postgresFolderRepository';
import { FolderUsecase } from '@/usecases/folder_usecase';
import { FolderController } from './controllers/folder_controller';

export const routes = new Elysia().use(cors()); 

const fileRepo = new PostgresFileRepository();
const fileUsecase = new FileUsecase(fileRepo);
const fileController = new FileController(fileUsecase);

const folderRepo = new PostgresFolderRepository();
const folderUsecase = new FolderUsecase(folderRepo, fileRepo);
const folderController = new FolderController(folderUsecase);

routes.get('/files', fileController.getAll);
routes.post('/files', fileController.create);
routes.get('/files/:id', fileController.getById);
routes.put('/files/:id', fileController.update);
routes.delete('/files/:id', fileController.delete);

routes.get('/folders', folderController.getAll);
routes.post('/folders', folderController.create);
routes.get('/folders/:id', folderController.getById);
routes.put('/folders/:id', folderController.update);
routes.delete('/folders/:id', folderController.delete);
routes.get('/folders/tree', folderController.getFolderTree);
