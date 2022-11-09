import express from 'express';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

const port = 8080;

app.listen(port, () => console.log(`Server is listening in port ${port}`));
