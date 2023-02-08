import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/auth';

export const routes = Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);

routes.use(AuthMiddleware);
routes.put('/users/:id', UserController.update);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);