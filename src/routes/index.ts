import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';

export const routes = Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.authenticate);