import { CreateTaskDto } from './dtos/CreateTaskDto';
import { TaskRepository } from './persistence/TaskRepository';
import { nanoid } from 'nanoid';
import { Inject, Service } from 'typedi';
import { ValidateDto } from '@shared/helpers/ValidateDto';
import { NotifyTask } from './interfaces/NotifyTask';
import { EmailNotify } from './integrations/EmailNotify';

@Service()
export class TaskService {
  constructor(
    private readonly repository: TaskRepository,
    @Inject(() => EmailNotify) private readonly emailNotify: NotifyTask
  ) {}

  @ValidateDto(CreateTaskDto)
  async createTask(newTask: CreateTaskDto): Promise<string> {
    const id = nanoid();
    await this.repository.save({ id, ...newTask });
    await this.emailNotify.alert(newTask.email);
    return id;
  }
}
