import { UseCase } from '@shared/interfaces/UseCase';
import { Service, Inject } from 'typedi';
import { EmailNotify } from '../integrations/EmailNotify';
import { NotifyTask } from '../interfaces/NotifyTask';
import { TaskRepository } from '../persistence/TaskRepository';
import { getDateRange } from '../utils';

@Service()
export class AlertUpcomingTasksUseCase implements UseCase<void, void> {
  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => EmailNotify) private readonly emailNotify: NotifyTask
  ) {}

  async exec(): Promise<void> {
    const today = new Date();
    const [start, end] = getDateRange(today, 3);
    const overdueTasks = await this.repository.getIncompletedByDueDateRange(start, end);

    if (!overdueTasks.length) return;

    await Promise.all(overdueTasks.map(({ email }) => this.emailNotify.alert(email)));
  }
}
