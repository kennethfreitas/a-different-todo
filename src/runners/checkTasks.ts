import 'dotenv/config';
import 'reflect-metadata';

import { TaskService } from '@core/task';
import Container from 'typedi';

const service = Container.get(TaskService);

export default async function checkTasks() {
  console.info("checkTasks Runner On")
  await service.checkOverdueTasks();
}
