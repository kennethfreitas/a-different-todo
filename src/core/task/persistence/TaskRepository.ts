import { Task } from '../interfaces/Task';
import { TaskModel } from './models/TaskModel';
import { Service } from 'typedi';

@Service()
export class TaskRepository {
  async save(task: Task): Promise<void> {
    await TaskModel.create(task);
  }

  async getByDueDateRange(start: Date, end: Date): Promise<Task[]> {
    const tasks = await TaskModel.find({ dueDate: { $gte: start, $lt: end } });
    return tasks.map(task => task.toObject());
  }
}
