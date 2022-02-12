import { brokerClient } from '@config/brokerClient';
import { UserService } from '@core/user';
import Container from 'typedi';
import { EachMessagePayload } from 'kafkajs';
import { TOPICS_NAME } from '@shared/constants/topicsNames';
import { BROKER_ENVS } from '@config/envs/brokerEnvs';

const service = Container.get(UserService);

export async function penaltUsers() {
  const consumer = brokerClient.consumer({ groupId: BROKER_ENVS.GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic: `${BROKER_ENVS.TOPIC_PREFIX}${TOPICS_NAME.EXPIRED_TASK}`, fromBeginning: true });

  console.info(`Listening on ${TOPICS_NAME.EXPIRED_TASK}`);

  await consumer.run({
    eachMessage: async (event: EachMessagePayload) => {
      const payload = event.message.value?.toString();
      if (!payload) return;

      const { responsible, email } = JSON.parse(payload);
      await service.addPenalty({ name: responsible, email });
    },
  });
}
