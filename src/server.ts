import express from 'express';
import path from 'node:path';
import { routes } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json'; 

require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerFile));

app.listen(3333, () => {
  console.log('Server is started on http://localhost:3333');
});