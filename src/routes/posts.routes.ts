import { Router } from 'express';
import PostController from '../controllers/PostController';
import { upload } from '../services/multer';


export const postsRoutes = Router();
postsRoutes.post('/posts',upload.single('image_path'), PostController.store);
