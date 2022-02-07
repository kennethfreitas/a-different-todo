import { Task } from '@core/task/interfaces/Task';
import { TaskRepository } from '@core/task/persistence/TaskRepository';

export const TaskRepositoryMock: TaskRepository = {
  async save(_task: Task): Promise<void> {},
};
