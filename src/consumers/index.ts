import 'reflect-metadata';
import 'dotenv/config';

import { connectDatabase } from '@config/connectToDatabase';
import { penaltUsers } from './penaltUsers';
import { brokerClient } from '@config/brokerClient';
import { BROKER_ENVS } from '@config/envs/brokerEnvs';
import { TOPICS_NAME } from '@shared/constants/topicsNames';
import { EachMessagePayload } from 'kafkajs';

const consumerName = process.argv[2];

const getConsumer: Record<string, (data: any) => Promise<void>> = {
  'penalt-users': penaltUsers,
};

export default async function startConsumer(consumerName: string): Promise<void> {
  if (!(consumerName in getConsumer)) {
    console.error('This consumer do not exit');
    return;
  }

  try {
    await connectDatabase();

    const consumer = brokerClient.consumer({ groupId: BROKER_ENVS.GROUP_ID });
    await consumer.connect();
    await consumer.subscribe({ topic: `${BROKER_ENVS.TOPIC_PREFIX}${TOPICS_NAME.EXPIRED_TASK}`, fromBeginning: true });

    console.info(`Listening on ${TOPICS_NAME.EXPIRED_TASK}`);

    await consumer.run({
      eachMessage: async (event: EachMessagePayload) => {
        console.info(`${new Date()} - New event to ${TOPICS_NAME.EXPIRED_TASK}`);

        const payload = event.message.value?.toString();
        const data = payload ? JSON.parse(payload) : null;
        await getConsumer[consumerName](data);
      },
    });
  } catch (error) {
    console.error(error);
  }
}

startConsumer(consumerName);
