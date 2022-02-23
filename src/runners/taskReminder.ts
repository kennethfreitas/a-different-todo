import 'dotenv/config';
import 'reflect-metadata';

import { TaskService } from '@core/task';
import Container from 'typedi';

const service = Container.get(TaskService);

export default async function taskReminder() {
  console.info("taskReminder Runner On")
  await service.alertUpcomingTasks();
}

taskReminder();
