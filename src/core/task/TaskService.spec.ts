import { TaskRepositoryMock } from '@spec/mocks';
import { TaskService } from './TaskService';

describe('Test Suite: Task Service', () => {
  const taskService = new TaskService(TaskRepositoryMock);

  afterEach(async () => jest.restoreAllMocks());

  describe('createTask', () => {
    test('It should create a new task and return a id', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const newTask = {
        description: 'Todo something',
        responsible: 'Joe',
      };

      const result = await taskService.createTask(newTask);

      expect(typeof result).toBe('string');
      expect(saveSpy).toHaveBeenCalled();
    });

    test('It should throw an error if is a todo without description', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const newTask = {
        description: '',
        responsible: 'Joe',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
    });

    test('It should throw an error if is a todo without responsible', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const newTask = {
        description: 'Todo something',
        responsible: '',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
    });
  });
});
