import { ExpiredTaskDto } from '@core/task';
import { AlertExpiration } from '@core/task/interfaces/AlertExpiration';

export const AlertExpirationMock: AlertExpiration = {
  async alert(_expiredTask: ExpiredTaskDto): Promise<void> {},
};
