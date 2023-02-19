import { authRoutes } from './auth.routes';
import { postsRoutes } from './posts.routes';
import { usersRoutes } from './users.routes';
import { followRoutes } from './follow.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/users', usersRoutes);

routes.use('/posts', postsRoutes);
routes.use('/follow', followRoutes);
