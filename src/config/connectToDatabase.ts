import mongoose from 'mongoose';
import { APP_ENV } from './envs';

export async function connectDatabase(): Promise<void> {
  console.info('Connecting to Database');

  await mongoose.connect(APP_ENV.DATABASE_URI);

  console.info('Database successfully connected!');
}
