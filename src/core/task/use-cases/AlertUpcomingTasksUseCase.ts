import { UseCase } from '@shared/interfaces/UseCase';
import { Service, Inject } from 'typedi';
import { EmailNotify } from '../integrations/EmailNotify';
import { NotifyTask } from '../interfaces/NotifyTask';
import { TaskRepository } from '../persistence/TaskRepository';

@Service()
export class AlertUpcomingTasksUseCase implements UseCase<void, void> {
  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => EmailNotify) private readonly emailNotify: NotifyTask
  ) {}

  async exec(): Promise<void> {
    const [start, end] = this.getDateRange();
    const overdueTasks = await this.repository.getByDueDateRange(start, end);

    if (!overdueTasks.length) return;

    await Promise.all(overdueTasks.map(({ email }) => this.emailNotify.alert(email)));
  }

  private getDateRange(): [Date, Date] {
    const upcomingDays = 3;
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setDate(end.getDate() + upcomingDays);
    end.setHours(23, 59, 59, 999);

    return [start, end];
  }
}
