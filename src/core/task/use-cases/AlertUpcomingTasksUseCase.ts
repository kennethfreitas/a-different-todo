import { UseCase } from '@shared/interfaces/UseCase';
import { Service, Inject } from 'typedi';
import { EmailNotify } from '../integrations/EmailNotify';
import { NotifyTask } from '../interfaces/NotifyTask';
import { TaskRepository } from '../persistence/TaskRepository';
import { getDateRange } from '../utils';

@Service()
export class AlertUpcomingTasksUseCase implements UseCase<void, void> {
  private DAYS_TO_EXPIRE = 3;

  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => EmailNotify) private readonly emailNotify: NotifyTask
  ) {}

  async exec(): Promise<void> {
    const today = new Date();
    const [start, end] = getDateRange(today, this.DAYS_TO_EXPIRE);
    const overdueTasks = await this.repository.getIncompletedByDueDateRange(start, end);

    if (!overdueTasks.length) return;

    await Promise.all(overdueTasks.map(({ email }) => this.emailNotify.alert(email)));
  }
}
