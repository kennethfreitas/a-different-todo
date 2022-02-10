import { NotifyTask } from '@core/task/interfaces/NotifyTask';

export const NotifyTaskMock: NotifyTask = {
  async alert(_email: string): Promise<void> {},
};
