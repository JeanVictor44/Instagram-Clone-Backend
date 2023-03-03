import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth';
import { upload } from '../services/multer';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { DeleteUserController } from '../useCases/deleteUser/DeleteUserController';
import { ShowUserController } from '../useCases/showUser/ShowUserController';
import { UpdatePasswordUserController } from '../useCases/updatePasswordUser/UpdatePasswordUserController';
import { UpdateUserController } from '../useCases/updateUser/UpdateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const showUserController = new ShowUserController();
const updatePasswordUserController = new UpdatePasswordUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post('/', upload.single('image_path'), createUserController.handle);
usersRoutes.use(AuthMiddleware);
usersRoutes.put('/:id',upload.single('image_path'), updateUserController.handle);
usersRoutes.patch('/:id/password/change', updatePasswordUserController.handle);
usersRoutes.get('/:id', showUserController.handle);
usersRoutes.delete('/:id', deleteUserController.handle);