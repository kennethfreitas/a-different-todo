import { AlertExpiration } from '../interfaces/AlertExpiration';
import { brokerClient } from '@config/brokerClient';
import { TOPICS_NAME } from '@shared/constants/topicsNames';
import { BROKER_ENVS } from '@config/envs/brokerEnvs';
import { Service } from 'typedi';
import { ExpiredTaskDto } from '../dtos';
import { ValidateDto } from '@shared/helpers/ValidateDto';

@Service()
export class ExpiredTaskAlert implements AlertExpiration {
  @ValidateDto(ExpiredTaskDto)
  async alert(expiredTask: ExpiredTaskDto): Promise<void> {
    await this.publishEvent(expiredTask);
  }

  private async publishEvent(expiredTask: ExpiredTaskDto): Promise<void> {
    const producer = brokerClient.producer();

    await producer.connect();
    await producer.send({
      topic: `${BROKER_ENVS.TOPIC_PREFIX}${TOPICS_NAME.EXPIRED_TASK}`,
      messages: [
        {
          value: JSON.stringify(expiredTask),
        },
      ],
    });

    await producer.disconnect();
  }
}
