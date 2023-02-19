import { Router } from 'express';
import UserController from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/auth';
import { upload } from '../services/multer';
import { createUserController } from '../useCases/createUser';

export const usersRoutes = Router();

usersRoutes.post('/', upload.single('image_path'), (request, response) => {
  return createUserController.handle(request, response);
});

usersRoutes.use(AuthMiddleware);
usersRoutes.put('/:id',upload.single('image_path'), UserController.update);
usersRoutes.patch('/:id/password/change', UserController.updatePassword);
usersRoutes.get('/:id', UserController.show);
usersRoutes.delete('/:id', UserController.delete);

