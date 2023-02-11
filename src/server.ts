import express from 'express';
import path from 'node:path';
import { AuthMiddleware } from './middlewares/auth';
import { usersRoutes } from './routes/users.routes';
import { authRoutes } from './routes/auth.routes';
import { postsRoutes } from './routes/posts.routes';
import { followRoutes } from './routes/follow.routes';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(authRoutes); 
app.use(usersRoutes);
app.use(postsRoutes);
app.use(followRoutes);

app.listen(3333, () => {
  console.log('Server is started on http://localhost:3333');
});