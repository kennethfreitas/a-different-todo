import { AlertExpiration } from '@core/task/interfaces/AlertExpiration';

export const AlertExpirationMock: AlertExpiration = {
  async alert(_taskId: string, _responsible: string, _email: string): Promise<void> {},
};
