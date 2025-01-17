import express from 'express';
import path from 'path';
import 'dotenv/config';
import { connectDB } from './config/db';
import {
  maintenanceRouter,
  partsRouter,
  reportsRouter,
  tanksRouter,
} from './routes';
import { errorMiddleware } from './middlewares';

const app = express();
app.use(express.static(path.join(__dirname, 'public'))).use(express.json());

app
  .use('/api/maintenance', maintenanceRouter)
  .use('/api/parts', partsRouter)
  .use('/api/reports', reportsRouter)
  .use('/api/tanks', tanksRouter);

app.use(errorMiddleware);

export const initializeApp = async () => {
  await connectDB();
  return app;
};
