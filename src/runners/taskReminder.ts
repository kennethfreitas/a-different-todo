import 'dotenv/config';
import 'reflect-metadata';

import { connectDatabase } from '@config/connectToDatabase';
import { TaskService } from '@core/task';
import mongoose from 'mongoose';
import Container from 'typedi';

const service = Container.get(TaskService);

export default async function taskReminder() {
  console.info('Starting runner...');
  await connectDatabase();

  await service.alertUpcomingTasks();

  console.info('Closing database connection');
  mongoose.disconnect();
  console.info('Done.');
}

taskReminder();
