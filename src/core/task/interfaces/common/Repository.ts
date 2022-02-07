import { Task } from '../Task';

export interface Repository {
  save(task: Task): Promise<void>;
}
