import express, { Application, Request, Response, NextFunction } from 'express';
import { errorHandler } from './middlewares/error-handler';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import router from './routes/route';
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use('/api', router);

app.use(errorHandler);

// Not Found
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: '404 Not Found' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
