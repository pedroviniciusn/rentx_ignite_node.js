import express from 'express';
import { categoriesRoutes } from './routes/categories';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);

const port = 8080;

app.listen(port, () => console.log(`Server is listening in port ${port}`));
