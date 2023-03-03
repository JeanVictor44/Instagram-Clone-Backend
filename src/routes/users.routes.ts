import { Router } from 'express';
import UserController from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/auth';
import { upload } from '../services/multer';
import { CreateUserController } from '../useCases/createUser/CreateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', upload.single('image_path'), createUserController.handle);

usersRoutes.use(AuthMiddleware);
usersRoutes.put('/:id',upload.single('image_path'), UserController.update);
usersRoutes.patch('/:id/password/change', UserController.updatePassword);
usersRoutes.get('/:id', UserController.show);
usersRoutes.delete('/:id', UserController.delete);