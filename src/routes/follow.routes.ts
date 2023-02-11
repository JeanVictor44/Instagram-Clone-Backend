import { Router } from 'express';
import FollowController from '../controllers/FollowController';

export const followRoutes = Router();
followRoutes.post('/follow/:followId', FollowController.follow);
