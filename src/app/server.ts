import express, { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

import { TaskService } from '@core/task';

const app = express();
app.use(express.json());

const service = Container.get(TaskService);

app.post('/tasks', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newId = await service.createTask(req.body);
    res.status(201).json({ id: newId });
  } catch (error: any) {
    error.statusCode = 400;
    next(error);
  }
});

app.post('/tasks/:id/done', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.completeTask(req.params.id);
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
});

type HttpError = Error & { statusCode: number };
app.use((error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(error.statusCode || 500).json({ message: error.message });
});

export default app;
