import { Task } from '../interfaces/Task';

export class CreateTaskDto implements Omit<Task, 'id'> {
  description!: string;
  responsible!: string;
}
