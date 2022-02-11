import { Task } from '../interfaces/Task';
import { TaskModel } from './models/TaskModel';
import { Service } from 'typedi';

@Service()
export class TaskRepository {
  async save(task: Task): Promise<void> {
    await TaskModel.create(task);
  }

  async getIncompletedByDueDateRange(start: Date, end: Date): Promise<Task[]> {
    const tasks = await TaskModel.find({ isDone: false, dueDate: { $gte: start, $lt: end } });
    return tasks.map(task => task.toObject());
  }

  async update(id: string, changes: Partial<Task>): Promise<void> {
    await TaskModel.findOneAndUpdate({ id }, changes, { runValidators: true });
  }
}
