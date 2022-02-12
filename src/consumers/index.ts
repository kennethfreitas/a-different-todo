import 'reflect-metadata';
import 'dotenv/config';

import { connectDatabase } from '@config/connectToDatabase';
import { penaltUsers } from './penaltUsers';

const consumer = process.argv[2];

const getConsumer: Record<string, () => Promise<void>> = {
  'penalt-users': penaltUsers,
};

export default async function startConsumer(consumer: string): Promise<void> {
  if (!(consumer in getConsumer)) {
    console.error('This consumer do not exit');
    return;
  }

  try {
    await connectDatabase();
    await getConsumer[consumer]();
  } catch (error) {
    console.error(error);
  }
}

startConsumer(consumer);
