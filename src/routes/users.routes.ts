import { Router } from 'express';
import UserController from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/auth';
import { upload } from '../services/multer';
import { createUserController } from '../useCases/createUser';

export const usersRoutes = Router();

usersRoutes.post('/users', upload.single('image_path'), (request, response) => {
  return createUserController.handle(request, response);
});
usersRoutes.use(AuthMiddleware);
usersRoutes.put('/users/:id',upload.single('image_path'), UserController.update);
usersRoutes.patch('/users/:id/password/change', UserController.updatePassword);
usersRoutes.get('/users/:id', UserController.show);
usersRoutes.delete('/users/:id', UserController.delete);

