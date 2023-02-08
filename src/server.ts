import express from 'express';
import { routes } from './routes';
import path from 'node:path';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333, () => {
  console.log('Server is started on http://localhost:3333');
});