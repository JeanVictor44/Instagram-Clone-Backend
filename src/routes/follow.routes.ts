import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth';
import { FolloUserController } from '../useCases/followUser/FollowUserController';

export const followRoutes = Router();

followRoutes.use(AuthMiddleware);
const followUserController = new FolloUserController();

followRoutes.post('/:followId', followUserController.handle);
