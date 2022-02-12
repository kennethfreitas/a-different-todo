import { AlertExpiration } from '../interfaces/AlertExpiration';
import { brokerClient } from '@config/brokerClient';
import { TOPICS_NAME } from '@shared/constants/topicsNames';
import { BROKER_ENVS } from '@config/envs/brokerEnvs';
import { Service } from 'typedi';

@Service()
export class ExpiredTaskAlert implements AlertExpiration {
  async alert(taskId: string, responsible: string, email: string): Promise<void> {
    await this.publishEvent(taskId, responsible, email);
  }

  private async publishEvent(taskId: string, responsible: string, email: string): Promise<void> {
    const producer = brokerClient.producer();

    await producer.connect();
    await producer.send({
      topic: `${BROKER_ENVS.TOPIC_PREFIX}${TOPICS_NAME.EXPIRED_TASK}`,
      messages: [
        {
          value: JSON.stringify({
            taskId,
            responsible,
            email,
          }),
        },
      ],
    });

    await producer.disconnect();
  }
}
