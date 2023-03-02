import { Router } from 'express';
import FollowController from '../controllers/FollowController';
import { AuthMiddleware } from '../middlewares/auth';

export const followRoutes = Router();

followRoutes.use(AuthMiddleware);
followRoutes.post('/:followId', FollowController.follow);
