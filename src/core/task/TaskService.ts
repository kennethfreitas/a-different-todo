import { CreateTaskDto } from './dtos/CreateTaskDto';
import { TaskRepository } from './persistence/TaskRepository';
import { nanoid } from 'nanoid';
import Container, { Inject, Service } from 'typedi';
import { ValidateDto } from '@shared/helpers/ValidateDto';
import { NotifyTask } from './interfaces/NotifyTask';
import { EmailNotify } from './integrations/EmailNotify';
import { AlertUpcomingTasksUseCase } from './use-cases/AlertUpcomingTasksUseCase';

@Service()
export class TaskService {
  private alertUpcomingTasksUseCase = Container.get(AlertUpcomingTasksUseCase);

  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => EmailNotify) private readonly emailNotify: NotifyTask
  ) {}

  @ValidateDto(CreateTaskDto)
  async createTask(newTask: CreateTaskDto): Promise<string> {
    const dueDate = new Date(newTask.dueDate);
    if (!this.isDueDateValid(dueDate)) throw new Error('Due date cannot be in the past');

    const id = nanoid();
    await this.repository.save({ ...newTask, id, dueDate, isDone: false });
    await this.emailNotify.alert(newTask.email);
    return id;
  }

  async completeTask(taskId: string): Promise<void> {
    await this.repository.update(taskId, { isDone: true });
  }

  async alertUpcomingTasks(): Promise<void> {
    await this.alertUpcomingTasksUseCase.exec();
  }

  private isDueDateValid(dueDate: Date): boolean {
    const today = new Date();
    return dueDate > today;
  }
}
