import 'dotenv/config';
import 'reflect-metadata';

import app from './app/server';
import { APP_ENV } from '@config/envs';
import { connectDatabase } from '@config/connectToDatabase';

async function bootstrap() {
  console.info('Starting application...');

  await connectDatabase();

  app.listen(APP_ENV.PORT, () => console.info(`Application running on port ${APP_ENV.PORT}`));
}

bootstrap();
