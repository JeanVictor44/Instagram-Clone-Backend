import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
import { AuthMiddleware } from '../middlewares/auth';
import multer from 'multer';
import path from 'node:path';
import FollowController from '../controllers/FollowController';
import PostControlle from '../controllers/PostControlle';

export const routes = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null,path.resolve(__dirname, '..', '..', 'uploads') );
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

routes.post('/users', upload.single('image_path'), UserController.store);
routes.post('/auth', AuthController.authenticate);

routes.use(AuthMiddleware);

routes.put('/users/:id',upload.single('image_path'), UserController.update);
routes.patch('/users/:id/password/change', UserController.updatePassword);

//Mostrar perfil público
routes.get('/users/:id', UserController.show);


routes.post('/follow/:followId', FollowController.follow);
routes.post('/posts',upload.single('image_path'), PostControlle.store);

routes.delete('/users/:id', UserController.delete);