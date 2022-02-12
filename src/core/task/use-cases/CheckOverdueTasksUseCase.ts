import { UseCase } from '@shared/interfaces/UseCase';
import { Service, Inject } from 'typedi';
import { ExpiredTaskAlert } from '../integrations/ExpiredTaskAlert';
import { AlertExpiration } from '../interfaces/AlertExpiration';
import { TaskRepository } from '../persistence/TaskRepository';
import { getDateRange } from '../utils';

@Service()
export class CheckOverdueTasksUseCase implements UseCase<void, void> {
  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => ExpiredTaskAlert) private readonly expiredTaskAlert: AlertExpiration
  ) {}

  async exec(): Promise<void> {
    const today = new Date();
    const [start, end] = getDateRange(today, -1);
    const overdueTasks = await this.repository.getIncompletedByDueDateRange(start, end);

    if (!overdueTasks.length) return;

    await Promise.all(
      overdueTasks.map(({ id, responsible, email }) => this.expiredTaskAlert.alert(id, responsible, email))
    );
  }
}
