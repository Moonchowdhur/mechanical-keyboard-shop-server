import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandel';
import notFound from './app/middleware/notFound';
import router from './app/routes';

// parser
app.use(express.json());

app.use(cors());

app.use(express.text());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use(notFound);

export default app;
