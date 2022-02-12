import { NotifyTaskMock, TaskRepositoryMock } from '@spec/mocks';
import Container from 'typedi';
import { AlertUpcomingTasksUseCase } from './AlertUpcomingTasksUseCase';

describe('AlertUpcomingTasksUseCase Test Suite', () => {
  const alertUpcomingTasksUseCase = Container.get(AlertUpcomingTasksUseCase);
  test('It should bring all tasks in a range of 3 days and send a reminder to the responsible', async () => {
    const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
    const result = alertUpcomingTasksUseCase.exec();

    await expect(result).resolves.not.toThrow();

    expect(alertSpy).toHaveBeenCalled();
  });

  test('It should do nothing it does not exist a task in the range', async () => {
    const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
    jest.spyOn(TaskRepositoryMock, 'getIncompletedByDueDateRange').mockImplementation(async (_start, _end) => []);
    const result = alertUpcomingTasksUseCase.exec();

    await expect(result).resolves.not.toThrow();

    expect(alertSpy).not.toHaveBeenCalled();
  });
});
