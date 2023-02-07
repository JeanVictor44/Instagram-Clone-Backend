import express from 'express';
import { routes } from './routes';
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server is started on http://localhost:3333');
});