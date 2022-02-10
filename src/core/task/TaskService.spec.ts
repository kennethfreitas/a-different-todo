import { NotifyTaskMock, TaskRepositoryMock } from '@spec/mocks';
import { TaskService } from './TaskService';

describe('Test Suite: Task Service', () => {
  const taskService = new TaskService(TaskRepositoryMock, NotifyTaskMock);

  afterEach(async () => jest.restoreAllMocks());

  describe('createTask', () => {
    test('It should create a new task and return a id', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: 'Todo something',
        responsible: 'Joe',
        email: 'joe@email.com',
      };

      const result = await taskService.createTask(newTask);

      expect(typeof result).toBe('string');
      expect(saveSpy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith(newTask.email);
    });

    test('It should throw an error if is a todo without description', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: '',
        responsible: 'Joe',
        email: 'joe@email.com',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });

    test('It should throw an error if is a todo without responsible', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: 'Todo something',
        responsible: '',
        email: 'joe@email.com',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });

    test('It should throw an error if is a todo without email', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: 'Todo something',
        responsible: 'Joe',
        email: '',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });
  });
});
