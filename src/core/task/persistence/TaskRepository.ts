import { Task } from '../interfaces/Task';
import { TaskModel } from './models/TaskModel';
import { Service } from 'typedi';

@Service()
export class TaskRepository {
  async save(task: Task): Promise<void> {
    await TaskModel.create(task);
  }
}
