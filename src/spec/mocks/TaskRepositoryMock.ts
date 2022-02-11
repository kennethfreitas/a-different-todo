import { Task } from '@core/task/interfaces/Task';
import { TaskRepository } from '@core/task/persistence/TaskRepository';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const TaskRepositoryMock: TaskRepository = {
  async save(_task: Task): Promise<void> {},
  async getIncompletedByDueDateRange(_start: Date, _end: Date): Promise<Task[]> {
    return [
      {
        id: 'owNKWvV32Lf2izCcDgNjo',
        description: 'Task description 1',
        dueDate: tomorrow,
        responsible: 'Mr Joe',
        email: 'joe@email.com',
        isDone: false,
      },
      {
        id: 'wxmR02MLLH6rtw7Wjt45w',
        description: 'Task description 2',
        dueDate: tomorrow,
        responsible: 'Mr Joe',
        email: 'joe@email.com',
        isDone: false,
      },
      {
        id: 'H0aRbKdbE-AsSdHrJKvFa',
        description: 'Task description 3',
        dueDate: tomorrow,
        responsible: 'Mr Joe',
        email: 'joe@email.com',
        isDone: false,
      },
    ];
  },
};
