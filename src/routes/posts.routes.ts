import { Router } from 'express';
import { upload } from '../services/multer';
import { createPostController } from '../useCases/createPost';

export const postsRoutes = Router();

postsRoutes.post('/',upload.single('image_path'), createPostController.handle);
