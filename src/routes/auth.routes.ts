import { Router } from 'express';
import { AuthUserController } from '../useCases/authUser/AuthUserController';

export const authRoutes = Router();

const authUserController = new AuthUserController();
authRoutes.post('/', authUserController.handle);
