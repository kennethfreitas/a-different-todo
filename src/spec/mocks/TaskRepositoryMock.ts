import { Task } from '@core/task/interfaces/Task';
import { TaskRepository } from '@core/task/persistence/TaskRepository';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const TaskRepositoryMock: TaskRepository = {
  async save(_task: Task): Promise<void> {},
  async update(_id: string): Promise<void> {},
  async getIncompletedByDueDateRange(_start: Date, _end: Date): Promise<Task[]> {
    return [
      {
        id: 'owNKWvV32Lf2izCcDgNjo',
        description: 'Task description',
        dueDate: tomorrow,
        responsible: 'Mr Joe',
        email: 'joe@email.com',
        isDone: false,
      },
    ];
  },
};
