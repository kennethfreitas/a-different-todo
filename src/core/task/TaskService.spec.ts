import { NotifyTaskMock, TaskRepositoryMock } from '@spec/mocks';
import Container from 'typedi';
import { TaskService } from './TaskService';

describe('Test Suite: Task Service', () => {
  const taskService = Container.get(TaskService);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrow = tomorrowDate.toISOString().slice(0, 10);

  afterEach(async () => jest.restoreAllMocks());

  describe('createTask', () => {
    test('It should create a new task and return a id', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: 'Todo something',
        dueDate: tomorrow,
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
        dueDate: tomorrow,
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
        dueDate: tomorrow,
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
        dueDate: tomorrow,
        responsible: 'Joe',
        email: '',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });

    test('It should throw an error if is a todo without due date', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const newTask = {
        description: 'Todo something',
        dueDate: '',
        responsible: 'Joe',
        email: 'joe@email.com',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });

    test('It should throw an error if is a todo has a due date on the past', async () => {
      const saveSpy = jest.spyOn(TaskRepositoryMock, 'save');
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');

      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);
      const yesterday = yesterdayDate.toISOString().slice(0, 10);

      const newTask = {
        description: 'Todo something',
        dueDate: yesterday,
        responsible: 'Joe',
        email: 'joe@email.com',
      };

      const result = taskService.createTask(newTask);

      await expect(result).rejects.toThrow();
      expect(saveSpy).not.toBeCalled();
      expect(alertSpy).not.toBeCalled();
    });
  });

  describe('alertUpcomingTasks', () => {
    test('It should bring all tasks in a range of 3 days and send a reminder to the responsible', async () => {
      const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
      const result = taskService.alertUpcomingTasks();

      await expect(result).resolves.not.toThrow();

      expect(alertSpy).toHaveBeenCalled();
    });
  });

  describe('completeTask', () => {
    test('It should complete a task', async () => {
      const updateSpy = jest.spyOn(TaskRepositoryMock, 'update');

      await expect(taskService.completeTask('id')).resolves.not.toThrow();

      expect(updateSpy).toBeCalled();
    });
  });
});
