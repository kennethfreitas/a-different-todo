import 'dotenv/config';
import 'reflect-metadata';

import { connectDatabase } from '@config/connectToDatabase';
import { TaskService } from '@core/task';
import mongoose from 'mongoose';
import Container from 'typedi';

const service = Container.get(TaskService);

export default async function checkTasks() {
  console.info('Starting runner...');
  await connectDatabase();

  await service.checkOverdueTasks();

  console.info('Closing database connection');
  mongoose.disconnect();
  console.info('Done.');
}

checkTasks();
