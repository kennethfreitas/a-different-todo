import { Repository } from '../interfaces/common';
import { Task } from '../interfaces/Task';
import { TaskModel } from './models/TaskModel';
import { Service } from 'typedi';

@Service()
export class TaskRepository implements Repository {
  async save(task: Task): Promise<void> {
    await TaskModel.create(task);
  }
}
