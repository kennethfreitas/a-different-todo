import 'reflect-metadata';
import 'dotenv/config';

import { connectDatabase } from '@config/connectToDatabase';
import checkTasks from './checkTasks';
import taskReminder from './taskReminder';

const runnerName = process.argv[2];

const getRunner: Record<string, (data: any) => Promise<void>> = {
  'check-tasks': checkTasks,
  'task-reminder': taskReminder,
};

export default async function startConsumer(runnerName: string): Promise<void> {
  if (!(runnerName in getRunner)) {
    console.error('This consumer do not exit');
    return;
  }

  try {
    console.info('Starting runner...');
    await connectDatabase();

    await service.checkOverdueTasks();

    console.info('Closing database connection');
    mongoose.disconnect();
    console.info('Done.');
  } catch (error) {
    console.error(error);
  }
}

startConsumer(runnerName);
