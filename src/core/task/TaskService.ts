import { CreateTaskDto } from './dtos/CreateTaskDto';
import { TaskRepository } from './persistence/TaskRepository';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';

@Service()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async createTask(newTask: CreateTaskDto): Promise<string> {
    if (!this.#isNewTaskValid(newTask)) throw new Error('A task must valid a description and a responsible.');

    const id = nanoid();
    await this.repository.save({ id, ...newTask });
    return id;
  }

  #isNewTaskValid(newTask: CreateTaskDto): boolean {
    const { description, responsible } = newTask;
    const isValidDescription = !!description && description.length > 10;
    const isValidResponsible = !!responsible;

    return isValidDescription && isValidResponsible;
  }
}
